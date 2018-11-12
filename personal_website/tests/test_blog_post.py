import unittest
from personal_website import blog_post

class TestBlogPost(unittest.TestCase):
    def test_can_initialize(self):
        '''Initialize a Blog Post'''
        blog_post.BlogPost()
