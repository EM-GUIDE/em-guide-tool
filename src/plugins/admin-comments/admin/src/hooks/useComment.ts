import { useQuery, useMutation, useQueryClient, type QueryKey } from 'react-query'
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

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

import pluginId from '../pluginId';

const buildQueryKey = (args: string[]): QueryKey => {
	return args.filter((a) => a);
};

export const useComment = () => {
	const toggleNotification = useNotification();
	const { del, post, put, get } = useFetchClient();
	const queryClient = useQueryClient();

	function onSuccessHandler({ queryKey, notification }: { queryKey: QueryKey, notification: { type: string, message: string } }): void {
		queryClient.invalidateQueries(queryKey);
		toggleNotification({
			type: notification.type,
			message: notification.message,
		});
	}

	function onErrorHandler(error: any): void {
		toggleNotification({
			type: 'warning',
			message: error.response?.error?.message || error.message || { id: 'notification.error' },
		});
	}

	function getComments(params: {
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
	} = { filters: {}, populate: ['admin_user'] }): any {
		return useQuery({
			queryKey: buildQueryKey([pluginId, params.filters.entitySlug, params.filters.entityId]),
			queryFn: function (): Promise<any> {
				return get(`/${pluginId}/comment`, {
					params,
				});
			},
			select: function ({ data }): any {
				return data;
			},
		});
	}

	const { mutateAsync: createComment } = useMutation({
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

	const { mutateAsync: updateComment } = useMutation({
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

	const { mutateAsync: deleteComment } = useMutation({
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

	return { getComments, createComment, updateComment, deleteComment };
};