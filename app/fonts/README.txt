PUT YOUR REAL .ttf FONT FILES IN THIS FOLDER.

Required (filenames must match app/fonts.ts exactly, case-sensitive):
  • CorporateACondPro-Regular.ttf   (you have this)
  • SuisseIntl-Book.ttf             (rename your Suisse Int'l Book file to this,
                                      OR edit the path in app/fonts.ts to match)

The dev server will not start until both files are present, because
app/fonts.ts loads them via next/font/local. If you see an error like
"Can't resolve './fonts/SuisseIntl-Book.ttf'", the filename here doesn't
match what app/fonts.ts expects — fix one to match the other.
