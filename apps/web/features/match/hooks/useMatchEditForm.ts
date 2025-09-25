import { useForm } from 'react-hook-form';
import { zodResolver } from '@workspace/ui/zod-resolver';
import { useGetMatch } from '@/features/match/match.hook';
import { matchSchema, MatchSchemaType } from '@/features/match/match.schema';
import { useUpdateMatch } from '../match.hook';
import { MatchStatus } from '@workspace/api/qgl-types';
import { redirect } from 'next/navigation';

export const useMatchEditForm = (id: string) => {
  const {
    data: { match },
    isLoading,
    error,
  } = useGetMatch(id);

  if (match.status === MatchStatus.Completed) return redirect(`/matches/${id}`);

  const { mutateAsync: mutateUpdateMatch, isPending } = useUpdateMatch();

  const form = useForm<MatchSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(matchSchema),
    defaultValues: {
      title: match.title ?? '',
      description: match.description,
      duration: match.duration,
      date: match.date ? new Date(match?.date) : new Date(),
      status: match.status,
      playerIds: match.players.map((p) => p.id) ?? [],
    },
  });

  const handleSubmit = async () => {
    try {
      await mutateUpdateMatch({
        id,
        match: form.getValues(),
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    form,
    isPending,
    handleSubmit,
    isLoading,
    error,
    match,
  };
};
