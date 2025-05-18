# main.py
from StringUtility import StringUtility

def main():
    text = input("Enter a string: ")
    su = StringUtility(text)

    print("Original:", su.text)
    print("Uppercase:", su.to_upper())
    print("Lowercase:", su.to_lower())
    print("Reversed:", su.reverse())
    print("Vowel Count:", su.count_vowels())
    print("Word Count:", su.word_count())
    print("Character Count (trimmed):", su.character_count())
    print("Length:", su.length_finder())
    print("Camel Case:", su.toCamelCase())
    print("Snake Case:", su.to_sanake_case())
    print("Pascal Case:", su.pascal_case())
    print("Title Case:", su.title_case())
    print("Swap Case:", su.swap_case())
    print("Dot Case:", su.dot_case())

if __name__ == "__main__":
    main()
