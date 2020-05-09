from rest_framework import serializers
from api.utils import Utils
from datetime import date

def cpf_validator(value):
    if len(value) != 11 or len(set(value)) == 1:
        raise serializers.ValidationError("CPF precisa ter 11 caracteres")

    first_cpf_weight = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    second_cpf_weight = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    first_part = value[:9]
    first_digit = value[9]
    second_digit = value[10]

    if not ((first_digit == Utils().get_first_digit(number=first_part, weight=first_cpf_weight)
             and second_digit == Utils().get_second_digit(updated_number=value[:10], weight=second_cpf_weight))):
        raise serializers.ValidationError("CPF Inválido")

def future_date_validator(value):
    if value > date.today():
        raise serializers.ValidationError("A data não pode ser posterior a hoje")