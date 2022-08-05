<p align="center">
  <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
</p>

<h3 align="center">
  Static Page Modal Plugin for Gatsby
</h3>

<p align="center">
  A plugin for Gatsby v4 to allow static pages to be rendered as a modal, incliuding URL routing.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/gatsby-plugin-static-page-modal">
    <img src="https://img.shields.io/npm/v/gatsby-plugin-static-page-modal?style=flat-square" alt="Current npm package version." />
  </a>
  <a href="https://www.npmjs.com/package/gatsby-plugin-static-page-modal">
    <img src="https://img.shields.io/bundlephobia/min/gatsby-plugin-static-page-modal?style=flat-square" alt="Bundle size" />
  </a>
  <a href="https://github.com/RBrNx/gatsby-plugin-static-page-modal/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/gatsby-plugin-static-page-modal?style=flat-square" alt="gatsby-plugin-static-page-modal is released under the 0BSD license." />
  </a>
</p>

<hr />

<br />

![Aug-05-2022 15-58-27](https://user-images.githubusercontent.com/1332314/183104661-02f75b10-ecea-4188-b8d8-94e1c554ceee.gif)

## Contents

- [Installation](#installation)
- [Usage Guide](#usage-guide)
  - [Gatsby Config](#gatsby-config)
  - [Parent Page Renderer](#parent-page-renderer)
  - [Create Modal Component](#create-modal-component)
  - [Navigate to Modal](#navigate-to-modal)
- [Contributing](#contributing)
  - [Local Development](#local-development)
  - [Code Quality](#code-quality)

<br />

## Installation

You can install via Yarn or npm

```bash
yarn add gatsby-plugin-static-page-modal
```

```bash
npm install gatsby-plugin-static-page-modal
```

<br />

## Usage Guide

There are a few steps to follow to get the plugin working as desired.

#### Gatsby Config

The first step is to add the plugin into your `gatsby-config.js`. 

```javascript
    {
      resolve: 'gatsby-plugin-static-page-modal',
      options: {
        pageRendererPath: `${__dirname}/src/library/components/PageRenderer.tsx`,
        routes: ['/portfolio/:slug/', '/blog/:slug/'],
      },
    },
```
Next we need to populate the options object with two pieces of information:

`pageRendererPath` - A path to a component which will be used to render the page _behind_ the modal

`routes` - An array of paths that correspond to the routes we want the page renderer to support.

#### Parent Page Renderer

Let's now create our page renderer component which is required to allow us to render the parent page beneath the modal. If your pages use GraphQL queries then Gatsby will generate `page-data.json` files during the build process - these will be used to populate the parent page with the data its expecting.

```javascript
import React from 'react';
import PortfolioPage from '../../pages/portfolio/index';
import PortfolioPageJSON from '../../../public/page-data/portfolio/page-data.json';
import BlogPage from '../../pages/blog/index';
import BlogPageJSON from '../../../public/page-data/blog/page-data.json';

interface PageRendererProps {
  match: {
    route: {
      path: string;
    };
    params: {
      [key: string]: string;
    };
    uri: string;
  };
}

const PageRenderer = ({ match }: PageRendererProps) => {
  switch (match.route.path) {
    case '/portfolio/:slug/':
      return <PortfolioPage data={PortfolioPageJSON?.result?.data} />;

    case '/blog/:slug/':
      return <BlogPage data={BlogPageJSON?.result?.data} />;

    default:
      return null;
  }
};

export default PageRenderer;

```

NOTE: `gatsby develop` or `gatsby build` may fail if the above `page-data.json` files do not exist. These can be generated with a simple bash script that can be run before the build process starts or during a CI Pipeline - `"start": "./initialisePageData.sh && gatsby develop",`

`initialisePageData.sh`
```bash
folderPaths=("public/page-data/portfolio/" "public/page-data/blog/")
for folder in ${folderPaths[@]};
do
  file="${folder}page-data.json"
  if [ ! -f "${file}" ]; then
    echo "Creating page data for $folder"
    mkdir -p $folder
    touch $file
    echo {} >> $file
  fi
done

```

#### Create Modal Component

Now you will need to create a new static page as you would normally do with Gatsby, which should contain the modal you want to display. Here is a simplified example of the `portfolio/{portfolioItem.title}.tsx` file

```javascript
// Imports removed for simplicity

const PortfolioItem = ({ data }: PageProps<PortfolioItemQuery, null, NavigationState>) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const onModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <CardModal
        show={modalVisible}
        onClose={onModalClose}
        onFlipFinish={onFlipFinish}
        cardFront={CardFrontComponent}
        cardBack={CardBackComponent}
        style={initialModalStyle}
      />
    </>
  );
};

// Page Query removed from simplicity

export default PortfolioItem;
```

#### Navigate to modal

The last step is to navigate to the modal page, which will trigger the `PageRenderer` component to build the underlying parent page, and then display the modal component on top.

```javascript
navigate('/portfolio/myModal', { state: { ... } });
```

<br />

## Contributing

I am more than happy to accept any contributions anyone would like to make, whether that's raising an issue, suggesting an improvement or developing a new feature.

#### Local Development

It's easy to get up and running locally! Just clone the repo, install the node modules and away you go! 🚀

```bash
> git clone git@github.com:RBrNx/gatsby-plugin-static-page-modal.git

> cd gatsby-plugin-static-page-modal

> yarn install # Alternatively use `npm install`
```

<br/>

#### Code Quality

To help keep the code styling consistent across the repo, I am using ESLint and Prettier, along with Git Hooks to ensure that any pull requests will meet the code quality standards.

While some of the hooks are specifically for code styling, there is a `pre-push` hook implemented that will run all of the Unit Tests before any commits are pushed. If any of the Unit Tests fail, or the overall Test Coverage drops below 95%, the push will fail
