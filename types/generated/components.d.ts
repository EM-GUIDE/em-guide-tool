import type { Attribute, Schema } from '@strapi/strapi';

export interface CommentsComments extends Schema.Component {
  collectionName: 'components_comments_comments';
  info: {
    description: '';
    displayName: 'comments';
    icon: 'message';
  };
  attributes: {
    admin_id: Attribute.Integer;
    admin_user: Attribute.Relation<
      'comments.comments',
      'oneToOne',
      'admin::user'
    >;
    comment: Attribute.Blocks & Attribute.Required;
    name: Attribute.String;
  };
}

export interface UrlOriginalUrls extends Schema.Component {
  collectionName: 'components_url_original_urls';
  info: {
    description: '';
    displayName: 'originalUrls';
    icon: 'alien';
  };
  attributes: {
    date: Attribute.Date & Attribute.Required;
    is_translation: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    magazine: Attribute.Relation<
      'url.original-urls',
      'oneToOne',
      'api::magazine.magazine'
    >;
    translation_request: Attribute.Relation<
      'url.original-urls',
      'oneToOne',
      'api::translation-request.translation-request'
    >;
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
