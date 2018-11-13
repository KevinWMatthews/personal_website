import unittest
from personal_website import blog_post

class TestBlogPost(unittest.TestCase):
    def setUp(self):
        self.url = 'test-post'
        self.title = 'Post Title'
        self.short_text = 'Quick intro to blog post'
        self.tags = ['Tag1', 'Tag2']
        self.post = blog_post.BlogPost(self.url, self.title, self.short_text, self.tags)

    def test_get_post_url(self):
        '''Get URL of Blog Post'''
        expected = self.url
        actual = self.post.url
        self.assertEqual(expected, actual)

    def test_get_post_title(self):
        '''Get title of Blog Post'''
        expected = self.title
        actual = self.post.title
        self.assertEqual(expected, actual)

    def test_get_post_short_text(self):
        '''Get short text of Blog Post'''
        expected = self.short_text
        actual = self.post.short_text
        self.assertEqual(expected, actual)

    def test_no_tags_by_default(self):
        '''Blog Post has no tags by default'''
        post = blog_post.BlogPost(self.url, self.title, self.short_text)
        expected = []
        actual = post.tags
        self.assertEqual(expected, actual)

    def test_get_tag(self):
        '''Get list of tags from Blog Post'''
        expected = self.tags
        actual = self.post.tags
        self.assertEqual(expected, actual)
