/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('All Feed objects have a url defined', function () {
            allFeeds.forEach(function(feed){
                let feedObject = feed;
                expect(feedObject.url).toBeDefined();
                expect(feedObject.url).not.toBe('');
            })
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('All feeds objects have a name defined', function () {
            allFeeds.forEach(function(feed){
                let feedObject = feed;
                expect(feedObject.name).toBeDefined();
                expect(feedObject.name).not.toBe('');
            })
        });

    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu items are hidden by default', function () {
            let menuClass = document.body.classList;
            let checkVisibility = menuClass.contains("menu-hidden");
            expect(checkVisibility).toBeTruthy();
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu visibility changed on click', function () {
            let menuIconClass = document.getElementsByClassName('menu-icon-link');
            let menuClass = document.body.classList;
            menuIconClass[0].click();
            expect(menuClass.contains("menu-hidden")).not.toBeTruthy();
            menuIconClass[0].click();
            expect(menuClass.contains("menu-hidden")).toBeTruthy();
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('checks if the feed has an initial entry when loadFeed is called', function () {
            let feedElement = document.getElementsByClassName('feed');
            let entryElement = feedElement[0].querySelectorAll('.entry');
            expect(entryElement.length).not.toBe(0);
        })

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feedElement, entryFirstFeed, entryFirstText, entrySecondFeed, entrySecondText;
        let compareText = false;
        /* To make sure that two different feeds are loaded, as well as the strings from the HTML
         * are saved, we nest the second loadFeed call within the first i.e. as a callback provided to
         * loadFeed. This makes sure that the RSS feed is fully loaded before the next callback is
         * executed */
        beforeEach(function (done) {
            loadFeed(0, function() {
                feedElement = document.getElementsByClassName('feed');
                entryFirstFeed = feedElement[0].querySelector('h2');
                entryFirstText = entryFirstFeed.textContent;
                loadFeed(1, function() {
                    feedElement = document.getElementsByClassName('feed');
                    entrySecondFeed = feedElement[0].querySelector('h2');
                    entrySecondText = entrySecondFeed.textContent;
                    done();
                });
            });
        });
        /* Placing the comparison of the two HTML strings inside the test spec makes sure
         * that the values are only compared after they are saved. */
        it('Ensures that two feeds loaded by the loadFeed function are not the same', function () {
            if (entryFirstText === entrySecondText) {
                compareText = true;
            }
            expect(compareText).toBe(false);
        })

    });

}());
