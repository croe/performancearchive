/**
 * Created by Akihiro-Kato on 2016/12/27.
 */

const data = {
  val: {
    per_page: 20,
    page: 1
  },
	paths: [
		{
		  BASE_URI: '//gids.jp/',
			PAGES_URL: '//gids.jp/wp-json/wp/v2/pages/',
			POSTS_URL: '//gids.jp/wp-json/wp/v2/posts/',
      LIMIT_POST_URI: '//gids.jp/wp-json/wp/v2/posts?per_page=10',
      TAGS_URI: '//gids.jp/wp-json/wp/v2/tags/',
      MEMBER_URI: '//gids.jp/wp-json/wp/v2/posts?filter[tag]=MEMBER?per_page=10',
      OPINION_URI: '//gids.jp/wp-json/wp/v2/posts?filter[tag]=OPINION?per_page=10'
		}
	],
  menu: {
    news: {
      name: 'News',
      link: '/performancearchive/news'
    },
    aboutus: {
      name: 'About Us',
      link: '/performancearchive/aboutus'
    },
    contact: {
      name: 'Contact',
      link: '/performancearchive/contact'
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
