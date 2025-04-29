from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255)
    sector = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    financial_capacity = models.DecimalField(max_digits=10, decimal_places=2)
    bidding_capacity = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.user.username} Profile'



# models.py
from django.db import models

class Tender(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    sector = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=15, decimal_places=2)
    posted_date = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=100)
    collaboration_opportunity = models.BooleanField(default=False)
    government_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.title


from django.db import models

class ReferralTender(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    document = models.FileField(upload_to='referral_tenders/')
    email = models.EmailField()
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=5.0)  # Example: 5% commission
    
    uploaded_at = models.DateTimeField(auto_now_add=True)

    @property
    def commission(self):
        """Calculate commission based on the value of the tender."""
        # Example: commission calculation is based on tender value, which should be passed from frontend
        # Let's assume a fixed value of 10000 for simplicity
        tender_value = 10000
        return (tender_value * self.commission_rate) / 100

    def __str__(self):
        return self.title


from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ForumPost(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.ImageField(upload_to='forum_posts/', blank=True, null=True)
    posted_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Allow NULL
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title

class ForumComment(models.Model):
    post = models.ForeignKey(ForumPost, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    commented_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.commented_by.username} on {self.post.title}"



from django.db import models
from django.contrib.auth.models import User
from .models import Tender  # adjust if your Tender model is elsewhere

# models.py

from django.db import models
from django.contrib.auth.models import User
from .models import Tender

class CollaborationRequest(models.Model):
    tender = models.ForeignKey(Tender, on_delete=models.CASCADE)
    requested_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    tender_owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='received_collab_requests')
    description = models.TextField()

    def __str__(self):
        return f"Request by {self.requested_by} for {self.tender.title}"



    
