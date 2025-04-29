from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['company_name', 'sector', 'location', 'financial_capacity', 'bidding_capacity']

    def create(self, validated_data):
        profile = Profile.objects.create(**validated_data)
        return profile


from rest_framework import serializers
from .models import Tender

class TenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tender
        fields = ['id', 'title', 'description', 'sector', 'value', 'state', 'collaboration_opportunity', 'government_url']



from rest_framework import serializers
from .models import ReferralTender

class ReferralTenderSerializer(serializers.ModelSerializer):
    commission = serializers.ReadOnlyField()

    class Meta:
        model = ReferralTender
        fields = ['id', 'title', 'description', 'document', 'email', 'commission_rate', 'commission', 'uploaded_at']
        
        


from rest_framework import serializers
from .models import ForumPost, ForumComment

from rest_framework import serializers
from .models import ForumPost, ForumComment

class ForumCommentSerializer(serializers.ModelSerializer):
    commented_by_name = serializers.CharField(source='commented_by.username', read_only=True)

    class Meta:
        model = ForumComment
        fields = ['id', 'content', 'commented_by', 'commented_by_name', 'created_at']

class ForumPostSerializer(serializers.ModelSerializer):
    posted_by_name = serializers.CharField(source='posted_by.username', read_only=True)
    comments = ForumCommentSerializer(many=True, read_only=True)
    total_likes = serializers.IntegerField(read_only=True)  # Removed the redundant source

    class Meta:
        model = ForumPost
        fields = ['id', 'title', 'description', 'photo', 'posted_by', 'posted_by_name', 'likes', 'total_likes', 'comments', 'created_at']
        read_only_fields = ['likes', 'comments']


# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CollaborationRequest

class CollaborationRequestSerializer(serializers.ModelSerializer):
    requested_by_username = serializers.SerializerMethodField()
    tender_owner_username = serializers.SerializerMethodField()
    tender_title = serializers.SerializerMethodField()

    class Meta:
        model = CollaborationRequest
        fields = ['id', 'tender', 'requested_by', 'tender_owner', 'description',
                  'requested_by_username', 'tender_owner_username', 'tender_title']

    def get_requested_by_username(self, obj):
        return obj.requested_by.username if obj.requested_by else None

    def get_tender_owner_username(self, obj):
        return obj.tender_owner.username if obj.tender_owner else None

    def get_tender_title(self, obj):
        return obj.tender.title
