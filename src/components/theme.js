import React from "react"
import { mix } from "polished"
import { graphql } from "gatsby"

const merge = require("lodash.merge")
const clonedeep = require("lodash.clonedeep")

export const Theme = (globalTheme, pageTheme, isDarkMode) => {
  const BaseTheme = clonedeep(globalTheme)
  merge(BaseTheme, pageTheme)

  const ThemeLight = {
    isDarkMode: false,
    color: {
      black: BaseTheme.color.black,
      white: BaseTheme.color.white,
      primary: BaseTheme.color.primary,
      secondary: BaseTheme.color.secondary,
      foreground: BaseTheme.color.black,
      background: BaseTheme.color.white,
      link: BaseTheme.color.primary,
    },
    easing: BaseTheme.easing,
    breakpoints: BaseTheme.breakpoints,
    radius: BaseTheme.radius,
    header: BaseTheme.header,
    page: BaseTheme.page,
    typography: BaseTheme.typography,
  }

  const ThemeDark = {
    isDarkMode: true,
    color: {
      black: BaseTheme.color.black,
      white: mix(0.7, BaseTheme.color.white, BaseTheme.color.secondary),
      primary: BaseTheme.color.primary,
      secondary: BaseTheme.color.secondary,
      foreground: mix(0.7, BaseTheme.color.white, BaseTheme.color.secondary),
      background: BaseTheme.color.black,
      link: BaseTheme.color.primary,
    },
    easing: BaseTheme.easing,
    breakpoints: BaseTheme.breakpoints,
    radius: BaseTheme.radius,
    header: BaseTheme.header,
    page: BaseTheme.page,
    typography: BaseTheme.typography,
  }

  return isDarkMode ? ThemeDark : ThemeLight
}

export const markdownFrontmatterFragment = graphql`
  fragment MarkdownFrontmatter on MarkdownRemark {
    frontmatter {
      path
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`

export const globalThemeFragment = graphql`
  fragment globalTheme on DataJson {
    color {
      black
      white
      primary
      secondary
    }
    easing
    breakpoints {
      small
      medium
      large
      huge
    }
    radius {
      small
    }
    header {
      overline
      layout
      background {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    page {
      displayHeadline
      displayTitle
    }
    typography {
      uppercaseH2
    }
  }
`

export const pageThemeFragment = graphql`
  fragment pageTheme on PagesJson {
    pageTheme {
      color {
        black
        white
        primary
        secondary
      }
      easing
      breakpoints {
        small
        medium
        large
        huge
      }
      radius {
        small
      }
      header {
        overline
        layout
        background {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      page {
        displayHeadline
        displayTitle
      }
      typography {
        uppercaseH2
      }
    }
  }
`
