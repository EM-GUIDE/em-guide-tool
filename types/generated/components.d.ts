import type { Schema, Attribute } from '@strapi/strapi';

export interface CommentsComments extends Schema.Component {
  collectionName: 'components_comments_comments';
  info: {
    displayName: 'comments';
    icon: 'message';
    description: '';
  };
  attributes: {
    comment: Attribute.Blocks & Attribute.Required;
    admin_user: Attribute.Relation<
      'comments.comments',
      'oneToOne',
      'admin::user'
    >;
    name: Attribute.String;
  };
}

export interface UrlOriginalUrls extends Schema.Component {
  collectionName: 'components_url_original_urls';
  info: {
    displayName: 'originalUrls';
    icon: 'alien';
  };
  attributes: {
    url: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'comments.comments': CommentsComments;
      'url.original-urls': UrlOriginalUrls;
    }
  }
}
