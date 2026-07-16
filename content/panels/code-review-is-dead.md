---
title: Code Review is Dead
date: 2026-02-28
slug: code-review-is-dead
category: Writing
---

Two months ago, I had eight sessions going across Claude, Codex, and Cursor, and about 15 features going between each of those agents. I asked it to commit, and it very generously lumped everything into a single commit.

I realized two things: I was missing a ton of information in that single commit, and I didn’t fully understand the output of all of those sessions.

## You didn't read that PR

Normally you’d go read the PR. In this case, it’s a 100,000-plus-line PR. I know you’re not reading those; I’m certainly not.

I spoke to a Director of Engineering with 100 developers who are all bottlenecked at this point. In fact, I've spoken with quite a few managers. Developers can generate code very quickly nowadays, and regardless of how good it is, the majority of shops are still reading PRs line by line.

So instead of doing the thing they love (let's assume it’s writing code), they're handing code creation to an LLM and spending their time reading PRs. It’s not hard to guess why developer satisfaction is going down.

## Reading PRs all day kinda sucks

On all of the teams I’ve been on, PRs have served two main purposes (there are others, but we'll focus on two here): knowledge transfer and bug squashing. As frontier models continue to improve, the bug squashing keeps getting better, but no matter how good a model gets, it’s never going to stuff those 15 features you just built into your big noggin.

And, if you don’t know what the model did, you can’t reasonably trust it’s gonna do the right thing in production. That’s like me telling you we should order pizza and you psychically knowing I meant Pizza Hut.

So, code review isn't dead—it’s changing.

## Ask it to review itself

How do we make sure it did what we asked, and didn’t fill your codebase with bugs?

The first thing I’ve done with good results is create a new session (pick the best frontier model you can) and ask it to grade the output. You can get creative based on your use case: tell it what matters most (security, architecture, etc.). Typically, these results are above average, although this isn’t airtight.

## Good cop, bad cop

The second thing you can do is open yet another clean session and play good cop, bad cop. Take the output from the first review session and have the new session red-team those results. I have had good luck with this. You end up with the highest-signal problems, which is what you want!

Do you work for Boeing? Use this technique to make sure your types are correct and your code won’t crash that plane because of a type error!

I’m kidding. If you work for Boeing please do not vibe code.

The downside to this method is that copying and pasting takes time.

## Blast radius

This next one is important: your blast radius.

What’s your blast radius, you say? Your blast radius determines how much your new code changes affect the critical path. Does this touch happy paths, major UI, security, or architecture? Is there a database migration hidden in those changes somewhere? Did you accidentally poison your codebase?[^poison-your-codebase]

The blast radius is what dictates whether you really need to review. Maybe you’re just updating docs and you’re itching to yolo these changes to prod. But maybe you’re migrating from RDS to PlanetScale, and you should give this one a quick glance, intern.

[^poison-your-codebase]: Finding AI-generated PRs: [“Mitchell Hashimoto on poisoning his AGENTS.md”](https://x.com/mitchellh/status/2067970516951150721?s=20)

## Ask questions

All of those methods exist to extract bugs and help you understand how your changes are going to affect your codebase. You should ask questions. Figure out why your agents made those decisions.

Keep in mind, you’re the only one with access to this! Your team probably doesn't have access to your sessions unless you're all sharing a Codex subscription. They might want to know why you added GraphQL to their codebase. They don’t necessarily have easy access to your context.

## The Missing Piece

So, this might be obvious at this point, but your session context is important. How do you get easy access to it?

You’re probably using git. Git only saves your code changes and a short message. It was built for humans, after all. It doesn’t save your session.

Machines now write code, and yet we still use git. Wouldn’t it be better if we started saving those sessions alongside your changes? You’d at least get the context to help describe why a change was made, in case anyone asks.

If only there was a way to chat with your sessions, codebase, and previous PRs to speed up your code review…

## I made an app

I made an app that does this. I’d like to introduce GX.

GX replaces git commit with gx commit to save your session data. Think of it like version control for agents. It works exactly as you’d expect git commit to work, except it saves data you're currently throwing away.

GX also simplifies your code review.

There will be PRs you don’t need to review at all, and GX will tell you that you can merge those right away. There will also be PRs that you should glance at. For those PRs, you get the most important changes in diffs and the ability to chat with GX directly and ask any questions you have.

It also provides attribution for any suggestions, so you know whether it identified a bug based on conflicts with your codebase or flagged a broken best practice based on 92 different sources of independent research.

You can now store all of your team's tribal knowledge just by updating your git commit command.

## Concluding

Traditional code review is very dead, but frontier models are enabling new types of review. And even with all of them, you still want to know what you're pushing to production, because at the end of the day your name is on those changes.

## Say hi

I would love to meet you and learn what you're building! DM me, respond, reach out. If you'd like to explore GX, please check it out.[^gx]

Thank you for reading!

[^gx]: [GX](https://gx.run)
