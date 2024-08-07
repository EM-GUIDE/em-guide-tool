import type { Schema, Attribute } from '@strapi/strapi';

export interface UrlOriginalUrls extends Schema.Component {
  collectionName: 'components_url_original_urls';
  info: {
    displayName: 'originalUrls';
    icon: 'alien';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    magazine: Attribute.Relation<
      'url.original-urls',
      'oneToOne',
      'api::magazine.magazine'
    >;
    date: Attribute.Date & Attribute.Required;
  };
}

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
    admin_id: Attribute.Integer;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'url.original-urls': UrlOriginalUrls;
      'comments.comments': CommentsComments;
    }
  }
}
