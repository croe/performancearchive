/**
 * Created by Akihiro-Kato on 2016/12/27.
 */

const data = {
  production: true,
  val: {
    per_page: 20,
    page: 1
  },
	paths: [
		{
		  BASE_URI: '//www.iamas.ac.jp/performancearchive/',
			PAGES_URL: '//www.iamas.ac.jp/performancearchive/wp-json/wp/v2/pages/',
			POSTS_URL: '//www.iamas.ac.jp/performancearchive/wp-json/wp/v2/posts/',
      LIMIT_POST_URI: '//www.iamas.ac.jp/performancearchive/wp-json/wp/v2/posts',
      TAGS_URI: '//www.iamas.ac.jp/performancearchive/wp-json/wp/v2/tags/?per_page=100&orderby=slug',
      // LIMIT_POST_URI: './data/dummy_postdata.json',
      // TAGS_URI: './data/dummy_tagdata.json',
      MEMBER_URI: '//www.iamas.ac.jp/performancearchive/wp/wp-json/v2/?filter[tag]=MEMBER?per_page=10',
      OPINION_URI: '//www.iamas.ac.jp/performancearchive/wp/wp-json/v2/?filter[tag]=OPINION?per_page=10'
		}
	],
  menu: {
    news: {
      name: 'News',
      link: '/performancearchive/about/?id=news'
    },
    aboutus: {
      name: 'About Us',
      link: '/performancearchive/about/?id=us'
    },
    contact: {
      name: 'Contact',
      link: '/performancearchive/about/?id=contact'
    },
    artist: {
      name: 'Artist',
      link: '/performancearchive/tags/artist'
    },
    title: {
      name: 'Title',
      link: '/performancearchive/tags/title'
    },
    performer: {
      name: 'Performer/Collaborator',
      link: '/performancearchive/tags/performer'
    },
    production: {
      name: 'Year of Production',
      link: '/performancearchive/tags/year_production'
    },
    recording: {
      name: 'Year of Recording',
      link: '/performancearchive/tags/year_recording'
    },
    director: {
      name: 'Recording Director',
      link: '/performancearchive/tags/director'
    }
  }
};
export default data;
