import os
import uuid
import boto3
import pathlib
from string import Template
from keplerapi import settings

class S3Uploader():
  def __init__(self,file,bucket= None):
    if bucket == None:
      bucket = settings.AWS_STORAGE_BUCKET_NAME

    self.bucket = bucket
    self.file = file
    self.name = uuid.uuid4().hex + pathlib.Path(file.name).suffix
    self.s3 = boto3.client('s3')
    self.url = settings.IMAGE_URL %(self.bucket,self.name)

  def upload(self):
    self.s3.upload_fileobj(self.file,self.bucket,self.name,ExtraArgs={'ACL': 'public-read'})

  def get_data(self):
    return {
      "name": self.name,
      "originalName": self.file.name,
      "url": self.url
    }

class LocalUploader():
  def __init__(self,file):
    self.file = file
    self.name = uuid.uuid4().hex + pathlib.Path(file.name).suffix
    self.url = settings.IMAGE_URL % self.name

  def upload(self):
    file = open("%s/%s" % (settings.TEMP_DIR,self.name),'wb+')
    file.write(self.file.read())
    file.close()

  def get_data(self):
    return {
      "name": self.name,
      "originalName": self.file.name,
      "url": self.url
    }