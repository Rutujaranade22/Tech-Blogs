import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/Blog.js";
import User from "./models/User.js";

dotenv.config();

const MONGO_URL= process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("❌ MONGO_URL is missing from .env file");
  process.exit(1);
}

// Simple function to create slugs from titles
const makeSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");

    // Delete old blogs
    await Blog.deleteMany({});

    // Create sample author
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
      });
      console.log("👤 Default user created:", user.email);
    }
   // Sample blogs with details
    const blogs = [
      {
        title: "Exploring React Hooks",
        category: "React",
        content: `
React Hooks revolutionized the way we write React components. 
Before Hooks, state and lifecycle management were restricted to class components. 
Now, you can use them directly in functional components, making code simpler and cleaner.

### Common Hooks
- **useState**: For managing state inside functional components.
- **useEffect**: For running side effects (like fetching data or updating the DOM).
- **useContext**: For accessing context values without wrapping components.
- **useReducer**: For complex state management, similar to Redux.

### Example
\`\`\`jsx
import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}
\`\`\`

Hooks make React development much more intuitive and maintainable.
        `,
        viewCount: 125,
      },
      {
        title: "Mastering MongoDB Aggregation",
        category: "MongoDB",
        content: `
MongoDB's Aggregation Framework is one of the most powerful tools for data transformation and analytics.

It allows developers to process data records and return computed results using **pipelines**.

### Common Aggregation Stages
- **\$match** — Filters documents (like WHERE in SQL)
- **\$group** — Groups documents by a field
- **\$project** — Reshapes documents (selects specific fields)
- **\$sort** — Sorts documents

### Example
\`\`\`js
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } },
  { $sort: { totalSpent: -1 } }
]);
\`\`\`

Aggregation pipelines are great for generating reports, analytics dashboards, and transforming raw data into meaningful insights.
        `,
        viewCount: 210,
      },
      {
        title: "Understanding JavaScript Closures",
        category: "JavaScript",
        content: `
Closures are one of the most important — and often misunderstood — concepts in JavaScript.

A **closure** is created when a function "remembers" the variables from its outer scope even after that function has returned.

### Example
\`\`\`js
function outer() {
  let counter = 0;

  function inner() {
    counter++;
    console.log(counter);
  }

  return inner;
}

const fn = outer();
fn(); // 1
fn(); // 2
fn(); // 3
\`\`\`

Here, the \`inner\` function retains access to \`counter\` even after \`outer()\` has finished executing.

Closures are the foundation of many JavaScript patterns — like **data privacy**, **function factories**, and **stateful logic**.
        `,    viewCount: 175,
      },
    ].map((b) => ({
      ...b,
      slug: makeSlug(b.title),
      author: user._id,
      status: "published",
    }));

    await Blog.insertMany(blogs);
    console.log("✅ Sample blogs added successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
    process.exit(1);
  }
};

seedData();
