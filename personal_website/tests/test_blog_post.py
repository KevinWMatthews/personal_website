import unittest
from personal_website import blog_post

class TestBlogPost(unittest.TestCase):
    def test_get_post_url(self):
        '''Get URL of Blog Post'''
        url = 'test-post'
        short_text = 'Quick intro to blog post'
        post = blog_post.BlogPost(url, short_text)

        expected = url
        actual = post.url
        self.assertEqual(expected, actual)

    def test_get_post_short_text(self):
        '''Get short text of Blog Post'''
        url = 'test-post'
        short_text = 'Quick intro to blog post'
        post = blog_post.BlogPost(url, short_text)

        expected = short_text
        actual = post.short_text
        self.assertEqual(expected, actual)
