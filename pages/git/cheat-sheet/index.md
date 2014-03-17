# Git Cheat Sheet

Here the Git commands I use every day.  These will probably cover 90% of what you need to do with Git.

## Status

	# What's added/changed/deleted?
	git status

--

	# What's changed/deleted?
	git status -uno
	
	# Short for
	git status --untracked-files=no

## Adding / Removing

	# stage
	git add path/to/file.cs

--  

	# unstage
	git reset HEAD path/to/file.cs

--

	# Delete a file
	git rm path/to/file3.cs

--

	# Stages all new and changed files (no removals)
	# 	In and under the current path
	git add .

--

	# Stages modifications or removals of tracked files
	# 	In the entire working tree
	git add -u

--

	# Stages all new files in and under the current path
	# Stages modifications or removals of tracked files
	# 	In the entire working tree
	# Equivalent to "git add .; git add -u"
	git add -A


## Committing

	# commit
	git add path/to/file.cs
	git commit -m 'Adds cod'

--

	# ammend commit
	git add path/to/file2.cs
	git commit -m 'Adds lots of code' -amend


## Branching

	# Create and checkout a new branch from where we are
	git checkout -b branch-name

--

	# Checkout a branch
	git checkout branch-name

--

	# Merge changes from master, into your branch
	git merge master

	# Merge your branch into master
	git checkout master
	git merge branch-name


## Diffing

	# Compare tracked files to HEAD
	git diff

--

	# Compare staged files to HEAD
	git diff --staged

--

	# Compate a single file to HEAD
	git diff HEAD path/to/file.cs


## Undoing

	# Reset the staging area
	git reset HEAD

-- 

	# Remove a file from being staged
	git reset HEAD path/to/file.cs

--

	# CAUTION!!!
	# Undo changes to a tracked file
	git checkout path/to/file.cs

--

	# CAUTION!!!
	# Blow away all changes to tracked files and reset the staging area
	# Deletes new files that have been staged!
	git reset --hard HEAD

--

	