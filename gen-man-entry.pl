#!/usr/bin/perl
#
# This script is used to auto-generate a markdown file that
# contains all local man page file links. The generated markdown
# file will be served as the entry point page for each man section,
# which are man1, man3, man5 and man7. The markdown file will be
# rendered by Jekyll after it's pushed into Github...
#
# Usage: perl gen-man-entry.pl /path/to/man/directory/
#
# Example: perl gen-man-entry.pl ./manpages/man1/
#
# and you will have: man1.md file in your current directory

use strict;
use warnings;

my $dry_run = 0;
# we just consider every argument as a path
if (@ARGV != 1) {
    die "Usage: $0 /path/to/man/directory";
}

print "Processing directory: $ARGV[0]...\n";

my $path = $ARGV[0];
my $output;

if ($path =~ m/.*\/(.*)\/$/) {
    $output = $1;
} else {
    die "Path pattern illegal";
}

my $output_filename = $output.".md";

print "Output[$output] file name: $output_filename\n";
open(FH, '>', $output_filename) or die $!;
if ($dry_run == 0) {
    print FH "---\n";
    print FH "layout: page\n";
    print FH "title: BabaSSL API - $output\n";
    print FH "permalink: /manpages-entry/$output/\n";
    print FH "---\n";
    print FH "\n";
} else {
    print "---\n";
    print "layout: page\n";
    print "title: BabaSSL API - $output\n";
    print "permalink: /manpages-entry/$output/\n";
    print "---\n";
    print "\n";
}

opendir(DIR, $path) or die "Can't open this directory";
my $filename;
$path =~ s/\.//;
while ($filename = readdir(DIR)) {
    if ($filename eq "." or $filename eq "..") {
        next;
    }
    $filename =~ s/\.html//;
    if ($dry_run == 0) {
        # write to real file
        print FH "* [$filename]($path$filename.html)\n";
    } else {
        print "* [$filename]($path$filename.html)\n";
    }
}

closedir(DIR);
close(FH);
