# Project-Catwalk

Project-Catwalk is the front-end half of an e-commerce website, designed to facilitate a user-friendly approach to shopping and browsing through the client's catalog of products.

## Description

An in-depth paragraph about your project and overview of use.
Project-Catwalk allows users to easily access the client's catalog of products. Users can search for products via the search bar, browse through the collection of pictures of each product and its different styles, as well as share the products they find on social media. Additionally, users can view related products, and add products to their outfit in order to bookmark them, creating their look before even needing to commit anything to their cart. Lastly, users can view reviews of each product, as well as leave reviews of their own. All products list a calculated average star rating of all reviews they've received, which reflects to the quarter of a star.

## Getting Started

To begin work on this project, please fork and clone down the repository. Use npm install to install everything from the package.json. You will need also need a GitHub API Token, which should be added to a copy of config.example.js named config.js. This file has already been added to the .gitignore, and should not be uploaded to GitHub for security reasons. Please do all work on a branch cut off from development, named after the feature you are working on. Merge to development only after your code review has been signed off on. When a version is being tested for stability, it will be merged to staging. Lastly, the final release will be merged from a stable staging branch to the main branch. Main should be kept clean outside of stable, public releases.

### Dependencies

* Requires node or something similar to manage package.json install. Otherwise, all dependencies included in repo.

### Installing

* For development, fork and clone to local computer from github.
* For consumer use, project is currently undeployed, though has previously been up and demo'd.

### Executing program

* After cloning down from GitHub, create a copy of config.example.js called config.js and swap out the template API Token for your own GitHub API token. Information on how to do that can be found [here] (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
* Next, install all libraries and dependcies using `npm install`.
* Then, build the bundle.js using the script included in the package.json: `npm run build`. Currently the build script is set up for developers, and includes a tag to continue watching for changes.
* Lastly, run the script to start the server: `npm start`. The server runs on nodemon, and should also update automatically when changes are made.
* Port is set to 3000.

## Help

The website uses google font Lato, but only the 100, 300, and 400 weights, with italics. Using any other weight will revert to basic sans-serif.

## Authors

Contributors names and contact info

Shanna Murry
  * [shannamurry] (https://github.com/shannamurry)
June Lee
  * [juneisenuj] (https://github.com/juneisenuj)
Joshua Barnes
  * [Joshua-Barnes03] (https://github.com/Joshua-Barnes03)

## Version History

*0.2
  * Second Product Demo
* 0.1
    * Initial Product Demo

## License

This project is under no licenses.

## Acknowledgments

ReadME created using template:
  * [ReadME-template] (https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc)
