import React from "react";

const Blog = () => {
  return (
    <div className="container py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div>
        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title bg-[#E2F7FA] text-xl font-medium">
            What are the different ways to manage a state in a React
            application?
          </div>
          <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
            <p>
              There are four main types of state you need to properly manage in
              your React apps: 1. Local state <br /> 2. Global state <br /> 3.
              Server state <br /> 4. URL state
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title bg-[#E2F7FA] text-xl font-medium">
            How does prototypical inheritance work?
          </div>
          <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
            <p>
              The Prototypal Inheritance is a feature in javascript used to add
              methods and properties in objects. It is a method by which an
              object can inherit the properties and methods of another object.
              Traditionally, in order to get and set the [[Prototype]] of an
              object, we use Object. getPrototypeOf and Object.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title bg-[#E2F7FA] text-xl font-medium">
            What is a unit test? Why should we write unit tests?
          </div>
          <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
            <p>
              The main objective of unit testing is to isolate written code to
              test and determine if it works as intended. Unit testing is an
              important step in the development process, because if done
              correctly, it can help detect early flaws in code which may be
              more difficult to find in later testing stages.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title bg-[#E2F7FA] text-xl font-medium">
            React vs. Angular vs. Vue?
          </div>
          <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
            <p>
              Vue provides higher customizability and hence is easier to learn
              than Angular or React. Further, Vue has an overlap with Angular
              and React with respect to their functionality like the use of
              components. Hence, the transition to Vue from either of the two is
              an easy option.
              <br /> <br />
              Angular, developed by Google, was first released in 2010, making
              it the oldest of the lot. It is a TypeScript-based JavaScript
              framework. A substantial shift occurred in 2016 on the release of
              Angular 2 (and the dropping of the “JS” from the original name –
              AngularJS). Angular 2+ is known as just Angular. Although
              AngularJS (version 1) still gets updates, we will focus the
              discussion on Angular.
              <br />
              Vue is generally more suited to smaller, less complex apps and is
              easier to learn from scratch compared to React. Vue can be easier
              to integrate into new or existing projects and many feel its use
              of HTML templates along with JSX is an advantage.
              <br />
              React often requires extra modules and components, which keeps the
              core library small, but means there’s extra work involved when
              incorporating outside tools. Angular, on the other hand, is more
              of a full-fledged solution that doesn’t require extras like React
              often does, though it does have a steeper learning curve for its
              core compared to React. React is more suitable for intermediate to
              advanced JavaScript developers who are familiar with concepts from
              ES6 and up, while Angular favors those same developers who are
              also familiar with TypeScript.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
