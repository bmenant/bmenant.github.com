module Jekyll
  module Filters
    # Join an array of things into a string by separating with commes and the
    # word "and" for the last one.
    #
    # array - The Array of Strings to join.
    # connector - The string to use as connector with the last word
    #
    # Examples
    #
    # array_to_sentence_string(["apples", "oranges", "grapes"])
    # # => "apples, oranges, and grapes"
    #
    # array_to_sentence_string(["Pierre", "Paul", "Jacques"], "et")
    # # => "Pierre, Paul et Jacques"
    #
    # Returns the formatted String.
    def array_to_locale_sentence_string(array, connector = "and")
      case array.length
      when 0
        ""
      when 1
        array[0].to_s
      when 2
        "#{array[0]} #{connector} #{array[1]}"
      else
        "#{array[0...-1].join(', ')}, #{connector} #{array[-1]}"
      end
    end
  end
end
