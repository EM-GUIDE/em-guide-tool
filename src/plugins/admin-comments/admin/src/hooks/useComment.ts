import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

import pluginId from '../pluginId';

const buildQueryKey = (args) => {
	return args.filter((a) => a);
};

export const useComment = () => {
	const toggleNotification = useNotification();
	const { del, post, put, get } = useFetchClient();
	const queryClient = useQueryClient();

	function onSuccessHandler({ queryKey, notification }) {
		queryClient.invalidateQueries(queryKey);
		toggleNotification({
			type: notification.type,
			message: notification.message,
		});
	}

	function onErrorHandler(error) {
		toggleNotification({
			type: 'warning',
			message: error.response?.error?.message || error.message || { id: 'notification.error' },
		});
	}

	function getComments(params = {}) {
		return useQuery({
			queryKey: buildQueryKey([pluginId, params.filters.entitySlug, params.filters.entityId]),
			queryFn: function () {
				return get(`/${pluginId}/comment`, {
					params,
				});
			},
			select: function ({ data }) {
				return data;
			},
		});
	}

	const { mutateAsync: createComment } = useMutation({
		mutationFn: function (body) {
			return post(`/${pluginId}/comment`, { data: body });
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
		mutationFn: function ({ id, body }) {
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
		mutationFn: function ({ id }) {
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