from keplerapi.settings import UPLOADER as Uploader,AWS_STORAGE_BUCKET_NAME as bucket
from api.serializers import FileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser

class UploadView(APIView):
  parser_classes=[MultiPartParser]

  def post(self,request):
    file = request.FILES.get('file')

    uploader = Uploader(file)
    serializer = FileSerializer(data=uploader.get_data())
    
    if not serializer.is_valid():
      return Response(serializer.errors,status=417)

    uploader.upload()

    serializer.create(serializer.data)
    
    return Response(FileSerializer(instance=serializer.create(serializer.data)).data,status=201)
    
