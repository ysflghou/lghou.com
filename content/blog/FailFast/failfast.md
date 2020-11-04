---
slug: fail-fast
date: 2020-11-05
title: 'About the Fail Fast principle'
description: 'the Fail fast principle, what, why and how ?'
categories: ['systems design']
keywords: ['design principles', 'systems design', 'best practices']
banner: './images/banner.jpg'
published: true
author: 'lghou'
redirects:
  - '/post'
---

# About the Fail Fast principle

## What is the Fail Fast principle

The Fail Fast principle is simple and easy: stop the current operation whenever an unexpected error occurs. Please note that there are some cases where errors are expected, in this case we can handle the operation differently without the need to stop the application, a good example would be the case of unsuccessful storage read operation where a retrying mecanism makes more since than failure.

You can think that failing fast can make the application fragile, but the more you catch errors early, the least it costs you to fix them, and the more your application becomes robust.

## Why adhere to the Fail Fast principle

At first, it's hard to adhere to the Fail Fast principle when you see the plenty of scenarios that lead to errors and thus can stop the application, but when you fail silently and hide the errors, you are just pretending that everthing is OK nevertheless it's not.
Here are some of the benefits of the Fail Fast principle:

- **No hidden exceptions**. If you fail silently, your program continue with hidden exceptions that can appear in a later stage of its execution, which make it hard to spot the source of the problem or change its behavior. The Fail fast can make debbuging easy.
- **Short feedback loop**. A lot of bugs can be fixed in development phase if we stick to the fail fast principle, and even if it gets to the production, once a problem is spotted by end users , they will have a clear understanding of the error, and, in turns, you can fix it quickly, giving the fact that you raise the right exception in the right place.
- **Consistent and powerfull applications**. You are aware of the behavior of your program, and you can prevent worse consequences after failing silently like deadlocks, crashes long after the original bug, data loss and corruption, and data inconsistency.

Note that, this is not valid for some critical applications where it's better to fail safe and react appropriately, or when having some stateless server that process requests independently and can continue working even if it fails to handle a request.

## How to Fail Fast

Beside what's in the code, the Fail Fast principle figures also in many agile practices.

- **Test-driven development**. You don't have to stick to the TDD as it is, but always keep in mind that you have to take all scenarios that you can figure into consideration when implementing your logic.
- **Continuous integration**. An Agile practice in software development, where you can integrate your development in a shared repository and run some tests and quick sanity checks to validate your changes, and run your code against different environments where you can validate that your infrastructure is OK (environment variables, configuration files, files access, ...).
- **Fail Fast in code**. The most important rule for better code is to never hide exceptions, the challenge is how to handle them. First, don't mix up handling and throwing the exceptions in the same time, and second, choose wisely when to catch your exceptions; in the highest level where you handle them directly before they are thrown directly to the user, or in the lowest level where you are interacting with some native or external code and you want to perform some actions like retrying or triggering other actions, but not in the middle.

## Example

Here is a simple example, of the benefits of the Fail Fast principle over hiding exceptions.

Let's suppose we have a service which perform an operation with retrying policy using a retry number from a configuration file.

```tsx

const string RETRY_NUMBER = "retryNumber";
const string DEFAULT_RETRY_PROPERTY = "5";

public string GetRetryNumberProperty(ServiceConfiguration configuration)
{
    string retryNumberProperty = configuration.GetParameter(RETRY_NUMBER);
    if (retryNumberProperty == null)
    {
        return DEFAULT_RETRY_PROPERTY;
    }
    else
    {
        return retryNumberProperty;
    }
}

ServiceConfiguration configuration = new ServiceConfiguration();
string retryNumber = GetRetryNumberProperty(configuration);

// use the retryNumber here

```

<br/>

This code doesn't respect the Fail Fast principle and can lead to errors like doing too little retrying which result in an unsuccessful operation.
You may think of it as a good workaround since we already know the default retry value, but it's not, because we don't have control over our program and the default value can be used even if the retry number is in the configuration given than it's bad written.

Now, if you stick to the principle and write some code like this:

```tsx

const string RETRY_NUMBER = "retryNumber";

public string GetRetryNumberProperty(ServiceConfiguration configuration)
{
    string retryNumberProperty = configuration.GetParameter(RETRY_NUMBER);
    if (retryNumberProperty == null)
    {
        throw new NullReferenceException(
            $"Missing or malformed configuration property {nameof(RETRY_NUMBER)} in {nameof(configuration)}");
    }
    else
    {
        return retryNumberProperty;
    }
}

ServiceConfiguration configuration = new ServiceConfiguration();
string retryNumber = GetRetryNumberProperty(configuration);

// use the retryNumber here

```

<br/>

With this implementation, we can spot and correct a problem related to the configuration reading and control the value used for the retry but in the first implementation we can spend days trying to figure out a problem showing far away from where we hid it.

## Resources

- https://enterprisecraftsmanship.com/posts/fail-fast-principle/
- https://dzone.com/articles/fail-fast-principle-in-software-development
- https://practical-programming.org/blog/fail-fast-principle-software-development/
- https://stackoverflow.com/questions/18679090/when-to-catch-the-exception-vs-when-to-throw-the-exceptions/59511485#59511485
