import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@workspace/ui/zod-resolver';
import { useGetMatch } from '@/features/match/match.hook';
import { matchSchema, MatchSchemaType } from '@/features/match/match.schema';
import { updateMatchAction } from '@/features/match/match.actions';
import { useUpdateMatch } from '../match.hook';

export const useMatchEditForm = (id: string) => {
  const {
    data: { match },
    isLoading,
    error,
  } = useGetMatch(id);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { mutateAsync: mutateUpdateMatch } = useUpdateMatch();

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
