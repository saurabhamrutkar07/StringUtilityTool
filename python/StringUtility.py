class StringUtility:
    def __init__(self,text:str):
        self.text = text 
    
    def to_upper(self):
        return self.text.upper() 

    def to_lower(self):
        return self.text.lower()
    
    def reverse(self):
        return self.text[::-1]
    
    def count_vowels(self):
        return sum(1 for char in self.text if char.lower() in 'aeiou')
    
    def word_count(self):
        return len(self.text.split()) 
    
    def character_count(self):
        return len(self.text.strip()) 
    
    def length_finder(self):
        return len(self.text)
    
    def toCamelCase(self):
        words = self.text.split()
        output = words[0].lower()
        for word in words[1:]:
            output += word.capitalize()
        
        return output 
    
    def to_sanake_case(self):
        words = self.text.split()
        output = ''
        for word in words[0:len(words)]:
            output += word.lower() + '_' 
            
        output += words[-1].lower() 
        return output

    def pascal_case(self):
        words = self.text.split()
        output = ''    
        for word in words:
            output += word.capitalize()
        return output

    def title_case(self):
        words = self.text.split()
        output = ''
        for word in words:
            output += word.capitalize() + " "
        return output.strip()
    
    def swap_case(self):
        #return self.text.swapcase()     
    
        # or 
        
        words = self.text.split()
        output = ''
        for word in words:
            for char in word:
                if char.isupper():
                    output += char.lower()
                elif char.islower():
                    output += char.upper()
                else:
                    output += char
            output += ' '
        return output   
    
    def dot_case(self):
        words = self.text.split()
        output = ''
        for word in words[0:len(words)]:
            output += word.lower() + '.'
        output += words[-1].lower()     
        return output  