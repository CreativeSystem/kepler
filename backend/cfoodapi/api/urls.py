from django.urls import path
from api.views.ProductItemView import ProductItemListCreate, ProductItemListRetrieveUpdateDestroy

urlpatterns = [
    path('product-items/', ProductItemListCreate.as_view()),
    path('product-items/<int:pk>/', ProductItemListRetrieveUpdateDestroy.as_view())
]
