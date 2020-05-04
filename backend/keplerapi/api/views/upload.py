from keplerapi.settings import UPLOADER as Uploader,AWS_STORAGE_BUCKET_NAME as bucket
from api.serializers import FileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser

class UploadView(APIView):
  parser_classes=[MultiPartParser]

  def post(self,request):
    file = request.FILES.get('file')

    if not file:
      return Response({"message": "File not found"},status=417)

    uploader = Uploader(file)
    serializer = FileSerializer(data=uploader.get_data())
   
    serializer.is_valid(raise_exception=True)

    uploader.upload()

    serializer.create(serializer.data)
    
    return Response(FileSerializer(instance=serializer.create(serializer.data)).data,status=201)
    
