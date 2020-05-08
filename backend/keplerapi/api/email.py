from django.template.loader import get_template
from django.core.mail import send_mail
from django.template import Context
from django.conf import settings


class EmailException(Exception):
  pass

class EmailAdress():
  def __init__(self,email,name=None):
    self.name = name
    self.email = email
  
  def address(self):
    return self.__str__()

  def __str__(self):
    if not self.name:
      return self.email
    return "%s <%s>" %(self.name,self.email)

class EmailSender():
 
  @staticmethod
  def send(tos,template_path,from_email=settings.EMAIL_DEFAULT,subject=None, data={}):
  
    def render_email(template_path=None,data={}):
      template =get_template(template_path)
      return template.render(data)
    
    if not tos or len(tos) < 1:
      raise EmailException("Os destinatários são obrigatórios")

    if not template_path:
      raise EmailException("O template do email é obrigatório")

    recipient_list = []

    for to in tos : 
      if isinstance(to,EmailAdress):
        recipient_list.append(to.address())
      else:
        recipient_list.append(to)

    return send_mail(
      subject= subject, 
      message = "",
      recipient_list= recipient_list,
      from_email= from_email, 
      html_message= render_email(template_path= template_path,data= data) )
