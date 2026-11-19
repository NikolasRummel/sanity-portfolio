---
title: "Time Tracking Dashboard"
slug: "time-tracking-dashboard"
description: "GitLab analytics dashboard developed for a DHBW software engineering project to visualize issue-based time tracking; the tool is now utilized by the Software Engineering professor as a demonstration tool during lectures."
image: "/images/content/time-tracking-dashboard-3456x2234.gif"
imageAlt: "demo"
url: "https://github.com/NikolasRummel/gitlab-timetracking-analysis/tree/main"
createdAt: "2026-01-22T20:06:26Z"
updatedAt: "2026-01-22T20:06:26Z"
---

# Time Tracking Dashboard

GitLab analytics dashboard developed for a DHBW software engineering project to visualize issue-based time tracking; the tool is now utilized by the Software Engineering professor as a demonstration tool during lectures.


> [!NOTE]  
> This project was developed in a short amount of time, so the code quality is not great.  
> It’s more a "it just works somehow" kind of project.
> 
## Features

- 📊 **Project Overview**: Sprint metrics, velocity tracking, and category distribution
- 📈 **Time Series Charts**: Weekly performance trends and team activity comparison
- 🎯 **Team & Categories**: Pie charts and bar charts for time allocation analysis
- ⚡ **Productivity Analysis**: Hourly and weekly productivity patterns
- 👥 **Team Collaboration**: Network visualization of team collaboration
- 📋 **Issue Analysis**: Issue complexity and time analysis
- 📅 **Detailed Activity**: GitHub-style activity heatmap

## Demo

![Dashboard Demo](public/images/dashboard-demo.gif)


## Configuration

### 1. GitLab API Configuration

Edit `config/dashboardConfig.ts` and update the following settings:

```typescript
export const GITLAB_CONFIG = {
    API_URL: 'https://gitlab.com/api/graphql',
    GROUP_PATH: 'your-group/your-project', // Replace with your GitLab group/project path
    TOKEN: 'your-gitlab-token', // Replace with your GitLab personal access token
    ISSUE_BASE_URL: 'https://gitlab.com/your-group/your-project/-/issues'
} as const;
```

#### Getting Your GitLab Token

1. Go to GitLab → Settings → Access Tokens
2. Create a new token with `read_api` scope
3. Copy the token and paste it in the config file

### 2. Team Members Configuration

Update the team members list in `config/dashboardConfig.ts`:

```typescript
export const TEAM_MEMBERS = [
    "username1",
    "username2", 
    "username3",
    // Add all team member usernames
] as const;
```

### 3. Date Range Configuration

Update the date range in `app/page.tsx`:

```typescript
// Set your desired date range
const startDate = new Date('2024-01-01'); // Start date
const endDate = new Date('2024-12-31');   // End date
```

### 4. Categories Configuration

The dashboard uses these default categories. You can modify them in `config/dashboardConfig.ts`:

```typescript
export const CATEGORIES = {
    REQUIREMENTS_ENGINEERING: "Requirements Engineering",
    ENTWURF: "Entwurf", 
    IMPLEMENTATION_TEST: "Implementation & Test",
    PROJEKTMANAGEMENT: "Projektmanagement"
} as const;
```



> [!WARNING]  
> Make sure your GitLab issues have labels that match these categories.
> 

## Contributing

If you want to improve this projects, feel free to create a fork :)

## Support
If you need help with setting up the project (for instance the api key or adding the labels to the issues on gitlab), feel free to contact me on discord:
[cubepixels](https://discord.com/users/cubepixels)
