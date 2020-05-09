class Utils:
    def __init__(self):
        self.divider = 11

    def get_first_digit(self, number, weight):
        sum = 0

        for i in range(len(weight)):
            sum += int(number[i]) * weight[i]

        rest_division = sum % self.divider

        if rest_division < 2:
            return '0'

        return str(11 - rest_division)

    def get_second_digit(self, updated_number, weight):
        sum = 0

        for i in range(len(weight)):
            sum += + int(updated_number[i]) * weight[i]

        rest_division = sum % self.divider

        if rest_division < 2:
            return '0'

        return str(11 - rest_division)
