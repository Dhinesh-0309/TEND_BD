from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, ProfileSerializer
from .models import Profile
from django.contrib.auth.models import User



# Generate Token after user registration
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()  # Create the user

            # Create the profile data
            profile_data = {
                'company_name': request.data.get('company_name'),
                'sector': request.data.get('sector'),
                'location': request.data.get('location'),
                'financial_capacity': request.data.get('financial_capacity'),
                'bidding_capacity': request.data.get('bidding_capacity'),
            }
            
            profile_serializer = ProfileSerializer(data=profile_data)
            if profile_serializer.is_valid():
                profile = profile_serializer.save(user=user)
                
                # Get the token after registration
                tokens = get_tokens_for_user(user)
                
                # Return the user data, profile data, and the tokens
                return Response({
                    'user': user_serializer.data,
                    'profile': profile_serializer.data,
                    'tokens': tokens  # Include the JWT tokens
                }, status=status.HTTP_201_CREATED)

            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# views.py (for tenders)
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tender
from .serializers import TenderSerializer

class TenderListView(APIView):
    def get(self, request):
        tenders = Tender.objects.all()
        serializer = TenderSerializer(tenders, many=True)
        return Response(serializer.data)



from rest_framework import generics
from .models import Tender
from .serializers import TenderSerializer

# List all tenders
class TenderListView(generics.ListCreateAPIView):
    queryset = Tender.objects.all()
    serializer_class = TenderSerializer

# Retrieve a single tender's details
class TenderDetailView(generics.RetrieveAPIView):
    queryset = Tender.objects.all()
    serializer_class = TenderSerializer





from rest_framework import generics
from .models import ReferralTender
from .serializers import ReferralTenderSerializer

# List all referral tenders (GET)
class ReferralTenderListView(generics.ListCreateAPIView):
    queryset = ReferralTender.objects.all()
    serializer_class = ReferralTenderSerializer

# Upload a new referral tender (POST)
class ReferralTenderUploadView(generics.CreateAPIView):
    queryset = ReferralTender.objects.all()
    serializer_class = ReferralTenderSerializer

# Get details of a single referral tender (GET)
class ReferralTenderDetailView(generics.RetrieveAPIView):
    queryset = ReferralTender.objects.all()
    serializer_class = ReferralTenderSerializer



from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import ForumPost, ForumComment
from .serializers import ForumPostSerializer, ForumCommentSerializer

guest_user, created = User.objects.get_or_create(username="guest")

# List all forum posts + Create post
class ForumPostListCreateAPIView(generics.ListCreateAPIView):
    queryset = ForumPost.objects.all().order_by('-created_at')
    serializer_class = ForumPostSerializer
    permission_classes = [permissions.AllowAny]  # Allow access for everyone

    def perform_create(self, serializer):
        # Ensure 'posted_by' is set to the current user if authenticated, else use guest user
        if self.request.user.is_authenticated:
            serializer.save(posted_by=self.request.user)
        else:
            serializer.save(posted_by=guest_user) 
 
 # Here we're saving with no user; this could be changed as per your needs.

# Like a forum post
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])  # Ensure that only authenticated users can like a post
def like_forum_post(request, pk):
    try:
        post = ForumPost.objects.get(pk=pk)
    except ForumPost.DoesNotExist:
        return Response({'detail': 'Post not found'}, status=404)
    
    user = request.user
    if user in post.likes.all():
        post.likes.remove(user)  # Unlike
    else:
        post.likes.add(user)  # Like
    
    return Response({'total_likes': post.total_likes()})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def comment_forum_post(request, pk):
    post = ForumPost.objects.get(pk=pk)
    # If the user is authenticated, associate the comment with the logged-in user, else set to None
    commented_by = request.user if request.user.is_authenticated else None
    comment = ForumComment.objects.create(
        post=post,
        commented_by=commented_by,
        content=request.data.get('content')
    )
    serializer = ForumCommentSerializer(comment)
    # Ensure to return the latest comment data
    return Response(serializer.data)



# views.py
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import CollaborationRequest
from .serializers import CollaborationRequestSerializer
from .models import Tender

# List all collaboration requests
@api_view(['GET'])
@permission_classes([permissions.AllowAny])  # Allow access to everyone (unauthenticated too)
def list_collaboration_requests(request):
    collaborations = CollaborationRequest.objects.all()
    serializer = CollaborationRequestSerializer(collaborations, many=True)
    return Response(serializer.data)

# Create a new collaboration request
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def create_collaboration_request(request, tender_id):
    try:
        tender = Tender.objects.get(id=tender_id)
    except Tender.DoesNotExist:
        return Response({'error': 'Tender not found'}, status=404)

    data = {
        'tender': tender.id,
        'requested_by': request.user.id if request.user.is_authenticated else None,
        'tender_owner': 1,  # TEMP: hardcoded owner user ID
        'description': request.data.get('description')
    }

    serializer = CollaborationRequestSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
