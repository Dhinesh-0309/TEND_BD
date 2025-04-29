from django.urls import path
from .views import  ForumPostListCreateAPIView, ReferralTenderDetailView, ReferralTenderListView, ReferralTenderUploadView, RegisterUserView, TenderDetailView, TenderListView, comment_forum_post, create_collaboration_request, like_forum_post, list_collaboration_requests
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('tenders/', TenderListView.as_view(), name='tender-list'),
    path('tenders/list/', TenderListView.as_view(), name='tender-list'),
    path('tenders/detail/<int:pk>/', TenderDetailView.as_view(), name='tender-detail'),
    path('referral-tenders/upload/',ReferralTenderUploadView.as_view(), name='upload_referral_tender'),
    path('referral-tenders/list/', ReferralTenderListView.as_view(), name='list_referral_tenders'),
    path('referral-tenders/detail/<int:pk>/',ReferralTenderDetailView.as_view(), name='referral_tender_detail'),
    path('forum/posts/', ForumPostListCreateAPIView.as_view(), name='forum-posts'),
    path('forum/posts/<int:pk>/like/', like_forum_post, name='forum-post-like'),
    path('forum/posts/<int:pk>/comment/',comment_forum_post, name='forum-post-comment'),
    path('collaborations/list/', list_collaboration_requests, name='collaboration-list'),
    path('collaborations/create/<int:tender_id>/', create_collaboration_request, name='collaboration-create'),
    
]
