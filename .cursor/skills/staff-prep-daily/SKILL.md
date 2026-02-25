---
name: staff-prep-daily
description: Provides the exact daily tasks, problems, and topics for the 3-month Staff Engineer preparation plan. Use when the user asks what to study today, daily prep, today's tasks, staff engineer prep, interview prep, or what to work on for their job interview preparation.
---

# Staff Prep Daily Tasks

When the user asks for today's tasks, daily prep, or what to study, follow this workflow.

## Workflow

### 1. Determine Current Day

Read [progress.json](progress.json) in this skill folder. It contains `startDate` (YYYY-MM-DD).

- **If startDate exists**: Compute `currentDay = (today - startDate) + 1` (in days). Day 1 = first day of plan.
- **If startDate is missing or user says they haven't started**: Ask "When did you start (or will you start) the plan? Use YYYY-MM-DD." Then set startDate and compute currentDay.
- **If currentDay > 60**: User has finished. Congratulate them and suggest: "You've completed the 12-week plan. Focus on applications and mock interviews. Want a refresher for a specific week?"
- **If currentDay < 1**: startDate is in the future. Say "Your plan starts on [startDate]. Until then, you could review [suggest a topic from Day 1]."

### 2. Look Up Today's Tasks

Read [daily-schedule.md](daily-schedule.md). Find the row for `Day N` where N = currentDay.

### 3. Output Today's Plan

Present the tasks in this format:

```markdown
## Staff Prep – Day [N] (Week [W], Day [D])

**Focus**: [from schedule]

**Today's tasks**:
1. [Task 1]
2. [Task 2]
...

**Resources**: [if relevant from schedule]
**Estimated time**: ~1.5–2 hours
```

Add 1–2 specific problem suggestions or design prompts from the schedule when applicable.

### 4. Optional: Update Progress

If the user says "I completed today" or "Mark day N done", you may offer to help them update progress.json (e.g. add a `lastCompletedDay` field). Do not modify progress.json unless the user explicitly asks.

---

## Quick Reference: Day Calculation

- `startDate` in progress.json = first day of plan (Day 1)
- `currentDay = floor((today - startDate) / 1 day) + 1`
- Week = ceil(currentDay / 5)
- Day in week = ((currentDay - 1) % 5) + 1

---

## If User Asks to Start or Reset

- "I want to start today" → Set startDate to today's date in progress.json (with user confirmation).
- "I want to start on [date]" → Set startDate to that date.
- "I'm on day X" → You can compute startDate = today - (X - 1) days, or ask user to confirm and update progress.json.

---

## Example Output (Day 6)

```markdown
## Staff Prep – Day 6 (Week 2, Day 1)

**Focus**: Arrays – two pointers

**Today's tasks**:
1. Solve 2 LeetCode problems on two pointers (e.g. Two Sum II, Container With Most Water, 3Sum)
2. Use NeetCode 150 Arrays section
3. Note patterns: when to use left/right pointers, when to move each

**Resources**: NeetCode 150, LeetCode Top 100
**Estimated time**: ~1.5 hours
```

---

## File Locations

- Progress: `.cursor/skills/staff-prep-daily/progress.json`
- Full schedule: `.cursor/skills/staff-prep-daily/daily-schedule.md`
- Full plan: `STAFF_ENGINEER_3_MONTH_PREP_PLAN.md` (project root)
