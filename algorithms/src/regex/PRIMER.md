# Regular expressions

*   [Previous](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Representing_dates_times)
*   [Next](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections)

Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the [`exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) and [`test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) methods of [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp), and with the [`match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match), [`matchAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll), [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), [`replaceAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll), [`search()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search), and [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) methods of [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). This chapter describes JavaScript regular expressions. It provides a brief overview of each syntax element. For a detailed explanation of each one's semantics, read the [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions) reference.

## [Creating a regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#creating_a_regular_expression)

You construct a regular expression in one of two ways:

*   Using a regular expression literal, which consists of a pattern enclosed between slashes, as follows:

js Copy to Clipboard

```
const re = /ab+c/;
```

Regular expression literals provide compilation of the regular expression when the script is loaded. If the regular expression remains constant, using this can improve performance.

*   Or calling the constructor function of the [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object, as follows:

js Copy to Clipboard

```
const re = new RegExp("ab+c");
```

Using the constructor function provides runtime compilation of the regular expression. Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input.

## [Writing a regular expression pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#writing_a_regular_expression_pattern)

A regular expression pattern is composed of simple characters, such as `/abc/`, or a combination of simple and special characters, such as `/ab*c/` or `/Chapter (\d+)\.\d*/`. The last example includes parentheses, which are used as a memory device. The match made with this part of the pattern is remembered for later use, as described in [Using groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences#using_groups).

### [Using simple patterns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#using_simple_patterns)

Simple patterns are constructed of characters for which you want to find a direct match. For example, the pattern `/abc/` matches character combinations in strings only when the exact sequence `"abc"` occurs (all characters together and in that order). Such a match would succeed in the strings `"Hi, do you know your abc's?"` and `"The latest airplane designs evolved from slabcraft."`. In both cases the match is with the substring `"abc"`. There is no match in the string `"Grab crab"` because while it contains the substring `"ab c"`, it does not contain the exact substring `"abc"`.

### [Using special characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#using_special_characters)

When the search for a match requires something more than a direct match, such as finding one or more b's, or finding white space, you can include special characters in the pattern. For example, to match _a single `"a"` followed by zero or more `"b"`s followed by `"c"`_, you'd use the pattern `/ab*c/`: the `*` after `"b"` means "0 or more occurrences of the preceding item." In the string `"cbbabbbbcdebc"`, this pattern will match the substring `"abbbbc"`.

The following pages provide lists of the different special characters that fit into each category, along with descriptions and examples.

[Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions) guide Assertions include boundaries, which indicate the beginnings and endings of lines and words, and other patterns indicating in some way that a match is possible (including look-ahead, look-behind, and conditional expressions).

[Character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes) guide Distinguish different types of characters. For example, distinguishing between letters and digits.

[Groups and backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences) guide Groups group multiple patterns as a whole, and capturing groups provide extra submatch information when using a regular expression pattern to match against a string. Backreferences refer to a previously captured group in the same regular expression.

[Quantifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers) guide Indicate numbers of characters or expressions to match.

If you want to look at all the special characters that can be used in regular expressions in a single table, see the following:

Special characters in regular expressions. | Characters / constructs | Corresponding article | | --- | --- | | `[xyz]`, `[^xyz]`, `.`, `\d`, `\D`, `\w`, `\W`, `\s`, `\S`, `\t`, `\r`, `\n`, `\v`, `\f`, `[\b]`, `\0`, `\cX`, `\xhh`, `\uhhhh`, `\u{hhhh}`, `x|y` | [Character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes) | | `^`, `$`, `\b`, `\B`, `x(?=y)`, `x(?!y)`, `(?<=y)x`, `(?<!y)x` | [Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions) | | `(x)`, `(?<Name>x)`, `(?:x)`, `\n`, `\k<Name>` | [Groups and backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences) | | `x*`, `x+`, `x?`, `x{n}`, `x{n,}`, `x{n,m}` | [Quantifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers) |

**Note:**[A larger cheat sheet is also available](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet) (only aggregating parts of those individual articles).

### [Escaping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping)

If you need to use any of the special characters literally (actually searching for a `"*"`, for instance), you must escape it by putting a backslash in front of it. For instance, to search for `"a"` followed by `"*"` followed by `"b"`, you'd use `/a\*b/` — the backslash "escapes" the `"*"`, making it literal instead of special.

Similarly, if you're writing a regular expression literal and need to match a slash ("/"), you need to escape that (otherwise, it terminates the pattern). For instance, to search for the string "/example/" followed by one or more alphabetic characters, you'd use `/\/example\/[a-z]+/i`—the backslashes before each slash make them literal.

To match a literal backslash, you need to escape the backslash. For instance, to match the string "C:" where "C" can be any letter, you'd use `/[A-Z]:\\/` — the first backslash escapes the one after it, so the expression searches for a single literal backslash.

If using the `RegExp` constructor with a string literal, remember that the backslash is an escape in string literals, so to use it in the regular expression, you need to escape it at the string literal level. `/a\*b/` and `new RegExp("a\\*b")` create the same expression, which searches for "a" followed by a literal "\*" followed by "b".

The [`RegExp.escape()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape) function returns a new string where all special characters in regex syntax are escaped. This allows you to do `new RegExp(RegExp.escape("a*b"))` to create a regular expression that matches only the string `"a*b"`.

### [Using parentheses](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#using_parentheses)

Parentheses around any part of the regular expression pattern causes that part of the matched substring to be remembered. Once remembered, the substring can be recalled for other use. See [Groups and backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences#using_groups) for more details.

## [Using regular expressions in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#using_regular_expressions_in_javascript)

Regular expressions are used with the [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) methods [`test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) and [`exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) and with the [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) methods [`match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match), [`matchAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll), [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), [`replaceAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll), [`search()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search), and [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split).

| Method | Description |
| --- | --- |
| [`exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) | Executes a search for a match in a string. It returns an array of information or `null` on a mismatch. |
| [`test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) | Tests for a match in a string. It returns `true` or `false`. |
| [`match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) | Returns an array containing all of the matches, including capturing groups, or `null` if no match is found. |
| [`matchAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll) | Returns an iterator containing all of the matches, including capturing groups. |
| [`search()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search) | Tests for a match in a string. It returns the index of the match, or `-1` if the search fails. |
| [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) | Executes a search for a match in a string, and replaces the matched substring with a replacement substring. |
| [`replaceAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) | Executes a search for all matches in a string, and replaces the matched substrings with a replacement substring. |
| [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) | Uses a regular expression or a fixed string to break a string into an array of substrings. |

When you want to know whether a pattern is found in a string, use the `test()` or `search()` methods; for more information (but slower execution) use the `exec()` or `match()` methods. If you use `exec()` or `match()` and if the match succeeds, these methods return an array and update properties of the associated regular expression object and also of the predefined regular expression object, `RegExp`. If the match fails, the `exec()` method returns `null` (which coerces to `false`).

In the following example, the script uses the `exec()` method to find a match in a string.

js Copy to Clipboard

```
const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz");
```

If you do not need to access the properties of the regular expression, an alternative way of creating `myArray` is with this script:

js Copy to Clipboard

```
const myArray = /d(b+)d/g.exec("cdbbdbsbz");
// similar to 'cdbbdbsbz'.match(/d(b+)d/g); however,
// 'cdbbdbsbz'.match(/d(b+)d/g) outputs [ "dbbd" ]
// while /d(b+)d/g.exec('cdbbdbsbz') outputs [ 'dbbd', 'bb', index: 1, input: 'cdbbdbsbz' ]
```

(See [Using the global search flag with `exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#using_the_global_search_flag_with_exec) for further info about the different behaviors.)

If you want to construct the regular expression from a string, yet another alternative is this script:

js Copy to Clipboard

```
const myRe = new RegExp("d(b+)d", "g");
const myArray = myRe.exec("cdbbdbsbz");
```

With these scripts, the match succeeds and returns the array and updates the properties shown in the following table.

Results of regular expression execution. | Object | Property or index | Description | In this example | | --- | --- | --- | --- | | `myArray` | | The matched string and all remembered substrings. | `['dbbd', 'bb', index: 1, input: 'cdbbdbsbz']` | | `index` | The 0-based index of the match in the input string. | `1` | | `input` | The original string. | `'cdbbdbsbz'` | | `[0]` | The last matched characters. | `'dbbd'` | | `myRe` | `lastIndex` | The index at which to start the next match. (This property is set only if the regular expression uses the g option, described in [Advanced Searching With Flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#advanced_searching_with_flags).) | `5` | | `source` | The text of the pattern. Updated at the time that the regular expression is created, not executed. | `'d(b+)d'` |

As shown in the second form of this example, you can use a regular expression created with an object initializer without assigning it to a variable. If you do, however, every occurrence is a new regular expression. For this reason, if you use this form without assigning it to a variable, you cannot subsequently access the properties of that regular expression. For example, assume you have this script:

js Copy to Clipboard

```
const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz");
console.log(`The value of lastIndex is ${myRe.lastIndex}`);

// "The value of lastIndex is 5"
```

However, if you have this script:

js Copy to Clipboard

```
const myArray = /d(b+)d/g.exec("cdbbdbsbz");
console.log(`The value of lastIndex is ${/d(b+)d/g.lastIndex}`);

// "The value of lastIndex is 0"
```

The occurrences of `/d(b+)d/g` in the two statements are different regular expression objects and hence have different values for their `lastIndex` property. If you need to access the properties of a regular expression created with an object initializer, you should first assign it to a variable.

### [Advanced searching with flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#advanced_searching_with_flags)

Regular expressions have optional flags that allow for functionality like global searching and case-insensitive searching. These flags can be used separately or together in any order, and are included as part of the regular expression.

| Flag | Description | Corresponding property |
| --- | --- | --- |
| `d` | Generate indices for substring matches. | [`hasIndices`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices) |
| `g` | Global search. | [`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global) |
| `i` | Case-insensitive search. | [`ignoreCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase) |
| `m` | Makes `^` and `$` match the start and end of each line instead of those of the entire string. | [`multiline`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline) |
| `s` | Allows `.` to match newline characters. | [`dotAll`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll) |
| `u` | "Unicode"; treat a pattern as a sequence of Unicode code points. | [`unicode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode) |
| `v` | An upgrade to the `u` mode with more Unicode features. | [`unicodeSets`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) |
| `y` | Perform a "sticky" search that matches starting at the current position in the target string. | [`sticky`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) |

To include a flag with the regular expression, use this syntax:

js Copy to Clipboard

```
const re = /pattern/flags;
```

or

js Copy to Clipboard

```
const re = new RegExp("pattern", "flags");
```

Note that the flags are an integral part of a regular expression. They cannot be added or removed later.

For example, `re = /\w+\s/g` creates a regular expression that looks for one or more characters followed by a space, and it looks for this combination throughout the string.

js Copy to Clipboard

```
const re = /\w+\s/g;
const str = "fee fi fo fum";
const myArray = str.match(re);
console.log(myArray);

// ["fee ", "fi ", "fo "]
```

You could replace the line:

js Copy to Clipboard

```
const re = /\w+\s/g;
```

with:

js Copy to Clipboard

```
const re = new RegExp("\\w+\\s", "g");
```

and get the same result.

The `m` flag is used to specify that a multiline input string should be treated as multiple lines. If the `m` flag is used, `^` and `$` match at the start or end of any line within the input string instead of the start or end of the entire string.

The `i`, `m`, and `s` flags can be enabled or disabled for specific parts of a regex using the [modifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) syntax.

#### Using the global search flag with exec()

[`RegExp.prototype.exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) method with the `g` flag returns each match and its position iteratively.

js Copy to Clipboard

```
const str = "fee fi fo fum";
const re = /\w+\s/g;

console.log(re.exec(str)); // ["fee ", index: 0, input: "fee fi fo fum"]
console.log(re.exec(str)); // ["fi ", index: 4, input: "fee fi fo fum"]
console.log(re.exec(str)); // ["fo ", index: 7, input: "fee fi fo fum"]
console.log(re.exec(str)); // null
```

In contrast, [`String.prototype.match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) method returns all matches at once, but without their position.

js Copy to Clipboard

```
console.log(str.match(re)); // ["fee ", "fi ", "fo "]
```

#### Using unicode regular expressions

The `u` flag is used to create "unicode" regular expressions; that is, regular expressions which support matching against unicode text. An important feature that's enabled in unicode mode is [Unicode property escapes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape). For example, the following regular expression might be used to match against an arbitrary unicode "word":

js Copy to Clipboard

```
/\p{L}*/u;
```

Unicode regular expressions have different execution behavior as well. [`RegExp.prototype.unicode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode) contains more explanation about this.

## [Examples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#examples)

**Note:** Several examples are also available in:

*   The reference pages for [`exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec), [`test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test), [`match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match), [`matchAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll), [`search()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search), [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
*   The guide articles: [character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes), [assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions), [groups and backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences), [quantifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers)

### [Using special characters to verify input](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#using_special_characters_to_verify_input)

In the following example, the user is expected to enter a phone number. When the user presses the "Check" button, the script checks the validity of the number. If the number is valid (matches the character sequence specified by the regular expression), the script shows a message thanking the user and confirming the number. If the number is invalid, the script informs the user that the phone number is not valid.

The regular expression looks for:

1.  the beginning of the line of data: `^`
2.  followed by three numeric characters `\d{3}` OR `|` a left parenthesis `\(`, followed by three digits `\d{3}`, followed by a close parenthesis `\)`, in a non-capturing group `(?:)`
3.  followed by one dash, forward slash, or decimal point in a capturing group `()`
4.  followed by three digits `\d{3}`
5.  followed by the match remembered in the (first) captured group `\1`
6.  followed by four digits `\d{4}`
7.  followed by the end of the line of data: `$`

#### HTML

html Copy to Clipboard play

```
<p>
  Enter your phone number (with area code) and then click "Check".
  <br />
  The expected format is like ###-###-####.
</p>
<form id="form">
  <input id="phone" />
  <button type="submit">Check</button>
</form>
<p id="output"></p>
```

#### JavaScript

js Copy to Clipboard play

```
const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const output = document.querySelector("#output");

const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;

function testInfo(phoneInput) {
  const ok = re.exec(phoneInput.value);

  output.textContent = ok
    ? `Thanks, your phone number is ${ok[0]}`
    : `${phoneInput.value} isn't a phone number with area code!`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  testInfo(input);
});
```

#### Result

play

## [Tools](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#tools)

[RegExr](https://regexr.com/) An online tool to learn, build, & test Regular Expressions.

[Regex tester](https://regex101.com/) An online regex builder/debugger

[Regex interactive tutorial](https://regexlearn.com/) An online interactive tutorials, Cheat sheet, & Playground.

[Regex visualizer](https://extendsclass.com/regex-tester.html) An online visual regex tester.

*   [Previous](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Representing_dates_times)
*   [Next](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections)

## Help improve MDN

Was this page helpful to you?

Yes No

[Learn how to contribute](https://github.com/mdn/content/blob/main/CONTRIBUTING.md "This will take you to our contribution guidelines on GitHub."). This page was last modified on Jan 24, 2025 by[MDN contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/contributors.txt).

[View this page on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/javascript/guide/regular_expressions/index.md?plain=1 "Folder: en-us/web/javascript/guide/regular_expressions (Opens in a new tab)")•[Report a problem with this content](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FRegular_expressions&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fjavascript%2Fguide%2Fregular_expressions%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FRegular_expressions%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fjavascript%2Fguide%2Fregular_expressions%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2Fed8ab20ada0827a6acc80e4870861dac5b9f87eb%0A*+Document+last+modified%3A+2025-01-24T18%3A17%3A38.000Z%0A%0A%3C%2Fdetails%3E "This will take you to GitHub to file a new issue.")

[](https://developer.mozilla.org/)Your blueprint for a better internet.

*   [MDN on Bluesky](https://bsky.app/profile/developer.mozilla.org)
*   [MDN on Mastodon](https://mastodon.social/@mdn)
*   [MDN on X (formerly Twitter)](https://twitter.com/mozdevnet)
*   [MDN on GitHub](https://github.com/mdn/)
*   [MDN Blog RSS Feed](https://developer.mozilla.org/en-US/blog/rss.xml)

## MDN

*   [About](https://developer.mozilla.org/en-US/about)
*   [Blog](https://developer.mozilla.org/en-US/blog/)
*   [Careers](https://www.mozilla.org/en-US/careers/listings/?team=ProdOps)
*   [Advertise with us](https://developer.mozilla.org/en-US/advertising)

## Support

*   [Product help](https://support.mozilla.org/products/mdn-plus)
*   [Report an issue](https://developer.mozilla.org/en-US/docs/MDN/Community/Issues)

## Our communities

*   [MDN Community](https://developer.mozilla.org/en-US/community)
*   [MDN Forum](https://discourse.mozilla.org/c/mdn/236)
*   [MDN Chat](https://developer.mozilla.org/discord)

## Developers

*   [Web Technologies](https://developer.mozilla.org/en-US/docs/Web)
*   [Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn)
*   [MDN Plus](https://developer.mozilla.org/en-US/plus)
*   [Hacks Blog](https://hacks.mozilla.org/)

[](https://www.mozilla.org/)

*   [Website Privacy Notice](https://www.mozilla.org/privacy/websites/)
*   [Cookies](https://www.mozilla.org/privacy/websites/#cookies)
*   [Legal](https://www.mozilla.org/about/legal/terms/mozilla)
*   [Community Participation Guidelines](https://www.mozilla.org/about/governance/policies/participation/)

Visit[Mozilla Corporation’s](https://www.mozilla.org/)not-for-profit parent, the[Mozilla Foundation](https://foundation.mozilla.org/).

Portions of this content are ©1998–2025 by individual mozilla.org contributors. Content available under[a Creative Commons license](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license).

*   [References](https://developer.mozilla.org/en-US/docs/Web)

    *   [Overview / Web Technology Web technology reference for developers](https://developer.mozilla.org/en-US/docs/Web)
    *   [HTML Structure of content on the web](https://developer.mozilla.org/en-US/docs/Web/HTML)
    *   [CSS Code used to describe document style](https://developer.mozilla.org/en-US/docs/Web/CSS)
    *   [JavaScript General-purpose scripting language](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
    *   [HTTP Protocol for transmitting web resources](https://developer.mozilla.org/en-US/docs/Web/HTTP)
    *   [Web APIs Interfaces for building web applications](https://developer.mozilla.org/en-US/docs/Web/API)
    *   [Web Extensions Developing extensions for web browsers](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
    *   [Accessibility Build web projects usable for all](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
    *   [Web Technology Web technology reference for developers](https://developer.mozilla.org/en-US/docs/Web)
*   [Learn](https://developer.mozilla.org/en-US/docs/Learn_web_development)

    *   [Overview / MDN Learning Area Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development)
    *   [MDN Learning Area Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development)
    *   [HTML Learn to structure web content with HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content)
    *   [CSS Learn to style content using CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics)
    *   [JavaScript Learn to run scripts in the browser](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting)
    *   [Accessibility Learn to make the web accessible to all](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility)
*   [Plus](https://developer.mozilla.org/en-US/plus)

    *   [Overview A customized MDN experience](https://developer.mozilla.org/en-US/plus)
    *   [AI Help Get real-time assistance and support](https://developer.mozilla.org/en-US/plus/ai-help)
    *   [Updates All browser compatibility updates at a glance](https://developer.mozilla.org/en-US/plus/updates)
    *   [Documentation Learn how to use MDN Plus](https://developer.mozilla.org/en-US/plus/docs/features/overview)
    *   [FAQ Frequently asked questions about MDN Plus](https://developer.mozilla.org/en-US/plus/docs/faq)
*   [Curriculum New](https://developer.mozilla.org/en-US/curriculum/)

*   [Blog](https://developer.mozilla.org/en-US/blog/)

*   Tools

    *   [Playground Write, test and share your code](https://developer.mozilla.org/en-US/play)
    *   [HTTP Observatory Scan a website for free](https://developer.mozilla.org/en-US/observatory)
    *   [AI Help Get real-time assistance and support](https://developer.mozilla.org/en-US/plus/ai-help)

Search MDN Clear search input Search

Theme

*   [Log in](https://developer.mozilla.org/users/fxa/login/authenticate/?next=%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FRegular_expressions)
*   [Sign up for free](https://developer.mozilla.org/users/fxa/login/authenticate/?next=%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FRegular_expressions)

1.  [References](https://developer.mozilla.org/en-US/docs/Web)
2.  [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
3.  [Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
4.  [Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)

Article Actions

English (US)

```
*   - [x] Remember language [](https://github.com/orgs/mdn/discussions/739 "Enable this setting to automatically switch to this language when it's available. (Click to learn more.)") 
*   [Deutsch](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Regular_expressions)
*   [Español](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions)
*   [Français](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Regular_expressions)
*   [日本語](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions)
*   [한국어](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_expressions)
*   [Português (do Brasil)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_expressions)
*   [Русский](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions)
*   [中文 (简体)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)
*   [正體中文 (繁體)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_expressions)
```

Filter sidebar Clear filter input

## In this article

*   [Creating a regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#creating_a_regular_expression)
*   [Writing a regular expression pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#writing_a_regular_expression_pattern)
*   [Using regular expressions in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#using_regular_expressions_in_javascript)
*   [Examples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#examples)
*   [Tools](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#tools)

1.  [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
2.  Tutorials and guides

Beginner's tutorials 1. [Your first website: Adding interactivity](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity) 2. [Dynamic scripting with JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting) 3. [JavaScript frameworks and libraries](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries)

[JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) 1. [Introduction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction) 2. [Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types) 3. [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) 4. [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) 5. [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) 6. [Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators) 7. [Numbers and strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings) 8. [Representing dates & times](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Representing_dates_times) 9. _[Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)_ 10. [Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections) 11. [Keyed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections) 12. [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects) 13. [Using classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) 14. [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) 15. [JavaScript typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays) 16. [Iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) 17. [Internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Internationalization) 18. [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

Intermediate 1. [Advanced JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects) 2. [Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS) 3. [Client-side web APIs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs) 4. [Language overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview) 5. [JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures) 6. [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness) 7. [Enumerability and ownership of properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties) 8. [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)

Advanced 1. [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain) 2. [Meta programming](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming) 3. [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)

7.  [References](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

[Built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) 1. [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) 2. [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) 3. [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 4. [AsyncFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 5. [AsyncGenerator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator) 6. [AsyncGeneratorFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction) 7. [AsyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator) 8. [Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics) 9. [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 10. [BigInt64Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array) 11. [BigUint64Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array) 12. [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 13. [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) 14. [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) 15. [decodeURI()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) 16. [decodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) 17. [encodeURI()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 18. [encodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 19. [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) 20. [escape()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/escape)Deprecated 21. [eval()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) 22. [EvalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError) 23. [FinalizationRegistry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry) 24. [Float16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float16Array) 25. [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) 26. [Float64Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array) 27. [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) 28. [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) 29. [GeneratorFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction) 30. [globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) 31. [Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity) 32. [Int8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array) 33. [Int16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array) 34. [Int32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array) 35. [InternalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/InternalError)Non-standard 36. [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) 37. [isFinite()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite) 38. [isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN) 39. [Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator) 40. [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) 41. [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) 42. [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) 43. [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) 44. [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 45. [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) 46. [parseFloat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) 47. [parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 48. [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 49. [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 50. [RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError) 51. [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError) 52. [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) 53. [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 54. [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) 55. [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 56. [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) 57. [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 58. [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) 59. [Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)Experimental 60. [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 61. [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 62. [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 63. [Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) 64. [Uint16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array) 65. [Uint32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array) 66. [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) 67. [unescape()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/unescape)Deprecated 68. [URIError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError) 69. [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 70. [WeakRef](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) 71. [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

[Expressions & operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators) 1. [Addition (+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition) 2. [Addition assignment (+=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment) 3. [Assignment (=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment) 4. [async function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function) 5. [async function\* expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function*) 6. [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) 7. [Bitwise AND (&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND) 8. [Bitwise AND assignment (&=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND_assignment) 9. [Bitwise NOT (~)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) 10. [Bitwise OR (|)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR) 11. [Bitwise OR assignment (|=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR_assignment) 12. [Bitwise XOR (^)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR) 13. [Bitwise XOR assignment (^=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR_assignment) 14. [class expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) 15. [Comma operator (,)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator) 16. [Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) 17. [Decrement (--)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement) 18. [delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) 19. [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) 20. [Division (/)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division) 21. [Division assignment (/=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division_assignment) 22. [Equality (==)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) 23. [Exponentiation (\*\*)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation) 24. [Exponentiation assignment (\*\*=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation_assignment) 25. [function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) 26. [function\* expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function*) 27. [Greater than (>)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than) 28. [Greater than or equal (>=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than_or_equal) 29. [Grouping operator ( )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping) 30. [import.meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) 1. [import.meta.resolve()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve)

```
31.   [import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
32.   [in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)
33.   [Increment (++)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment)
34.   [Inequality (!=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Inequality)
35.   [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
36.   [Left shift (<<)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift)
37.   [Left shift assignment (<<=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift_assignment)
38.   [Less than (<)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than)
39.   [Less than or equal (<=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than_or_equal)
40.   [Logical AND (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)
41.   [Logical AND assignment (&&=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)
42.   [Logical NOT (!)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)
43.   [Logical OR (||)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)
44.   [Logical OR assignment (||=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)
45.   [Multiplication (*)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Multiplication)
46.   [Multiplication assignment (*=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Multiplication_assignment)
47.   [new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)
48.   [new.target](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target)
49.   [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)
50.   [Nullish coalescing assignment (??=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment)
51.   [Nullish coalescing operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
52.   [Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
53.   [Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
54.   [Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
55.   [Property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)
56.   [Remainder (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
57.   [Remainder assignment (%=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder_assignment)
58.   [Right shift (>>)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift)
59.   [Right shift assignment (>>=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift_assignment)
60.   [Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
61.   [Strict equality (===)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
62.   [Strict inequality (!==)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_inequality)
63.   [Subtraction (-)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction)
64.   [Subtraction assignment (-=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction_assignment)
65.   [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
66.   [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
67.   [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
68.   [Unary negation (-)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_negation)
69.   [Unary plus (+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus)
70.   [Unsigned right shift (>>>)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift)
71.   [Unsigned right shift assignment (>>>=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift_assignment)
72.   [void operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)
73.   [yield](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)
74.   [yield*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*)
```

[Statements & declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements) 1. [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) 2. [async function\*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*) 3. [Block statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) 4. [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) 5. [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class) 6. [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) 7. [continue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue) 8. [debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger) 9. [do...while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while) 10. [Empty statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/Empty) 11. [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) 12. [Expression statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/Expression_statement) 13. [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) 14. [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) 15. [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) 16. [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) 17. [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) 18. [function\*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) 19. [if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 20. [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 1. [Import attributes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with)

```
21.   [Labeled statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)
22.   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
23.   [return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)
24.   [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
25.   [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
26.   [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
27.   [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
28.   [while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
29.   [with](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)Deprecated
```
