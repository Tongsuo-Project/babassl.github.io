#!/bin/bash
# Update all 4 man page entry pages.

perl gen-man-entry.pl ./manpages/man1/
perl gen-man-entry.pl ./manpages/man3/
perl gen-man-entry.pl ./manpages/man5/
perl gen-man-entry.pl ./manpages/man7/
