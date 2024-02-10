import { useQuery, useMutation, useQueryClient, type QueryKey } from 'react-query'
import { useFetchClient, useNotification } from '@strapi/helper-plugin';
import pluginId from '../pluginId';

export interface Comment {
	id: number;
	comment: string;
	entityId: number;
	entitySlug: string;
	admin_user: {
		id: number;
		firstname: string;
		lastname: string;
	};
	createdAt: string;
	updatedAt: string;
}

export interface CreateCommentParams {
	comment: string;
	entityId: string;
	entitySlug: string;
	admin_user: {
		connect: string[];
	};
}

const buildQueryKey = (args: string[]): QueryKey => {
	return args.filter((a) => a);
};

export const useComment = () => {
	const toggleNotification = useNotification();
	const { del, post, put, get } = useFetchClient();
	const queryClient = useQueryClient();

  const onSuccessHandler = ({ queryKey, notification }: { queryKey: QueryKey, notification: { type: string, message: string } }): void => {
    queryClient.invalidateQueries(queryKey);
    toggleNotification({
      type: notification.type,
      message: notification.message,
    });
  };

  const onErrorHandler = (error: any): void => {
    toggleNotification({
      type: 'warning',
      message: error.response?.error?.message || error.message || { id: 'notification.error' },
    });
  };

  const getComments = (params: {
    filters: {
      [key: string]: string
    },
    populate?: string[] | {
      admin_user: {
        fields: string[]
      }
    },
    sort?: {
      [key: string]: string;
    };
  } = { filters: {}, populate: ['admin_user'] }): any => {
    return useQuery({
      queryKey: buildQueryKey([pluginId, params.filters.entitySlug, params.filters.entityId]),
      queryFn: function () {
        return get(`/${pluginId}/comment`, {
          params,
        });
      },
      select: function ({ data }): any {
        return data;
      },
    });
  };

  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: async (params: CreateCommentParams) => {
      return post(`/${pluginId}/comment`, { data: params });
    },
    onSuccess: ({ data: response }) => {
      const queryKey = buildQueryKey([
        pluginId,
        response.entitySlug,
        response.entityId,
      ]);

      onSuccessHandler({
        queryKey,
        notification: {
          type: 'success',
          message: 'Comment has been successfully created',
        },
      });
    },
    onError: onErrorHandler,
  });

  // Update comment mutation
  const updateCommentMutation = useMutation({
    mutationFn: function ({ id, body }: { id: number, body: any }) {
      return put(`/${pluginId}/comment/${id}`, { data: body });
    },
    onSuccess: ({ data: response }) => {
      const { data } = response;
      const queryKey = buildQueryKey([
        pluginId,
        data.attributes.entitySlug,
        data.attributes.entityId,
      ]);

      onSuccessHandler({
        queryKey,
        notification: {
          type: 'success',
          message: 'Comment has been successfully updated',
        },
      });
    },
    onError: onErrorHandler,
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: function ({ id }: { id: number }) {
      return del(`/${pluginId}/comment/${id}`);
    },
    onSuccess: ({ data: response }) => {
      const { data } = response;
      const queryKey = buildQueryKey([
        pluginId,
        data.attributes.entitySlug,
        data.attributes.entityId,
      ]);

      onSuccessHandler({
        queryKey,
        notification: {
          type: 'success',
          message: 'Comment has been successfully deleted.',
        },
      });
    },
    onError: onErrorHandler,
  });

  return {
    getComments,
    createComment: createCommentMutation.mutateAsync,
    updateComment: updateCommentMutation.mutateAsync,
    deleteComment: deleteCommentMutation.mutateAsync,
  };
};