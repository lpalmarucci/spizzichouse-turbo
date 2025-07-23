'use client';

import { useGetPlayerById, useUpdatePlayer } from '@/features/player/player.hook';
import { updatePlayerAction } from '@/features/player/player.actions';
import { useRouter, redirect } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@workspace/ui/zod-resolver';
import { Player, PlayerLevel, PlayerStatus } from '@workspace/api/qgl-types';
import { toast } from 'sonner';

const playerSchema = z.object({
  full_name: z.string(),
  bio: z.string().max(255),
  level: z.nativeEnum(PlayerLevel),
  status: z.nativeEnum(PlayerStatus),
});

type PlayerEditFormType = z.infer<typeof playerSchema>;

export function usePlayerEdit(id: string, player: Player) {
  const { mutateAsync: updatePlayer, isPending: isUpdating } = useUpdatePlayer();

  const form = useForm<PlayerEditFormType>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      bio: player?.bio ?? '',
      full_name: player?.full_name ?? '',
      level: player?.level ?? PlayerLevel.Beginner,
      status: player?.status ?? PlayerStatus.Active,
    },
    mode: 'onChange',
  });

  const handleStatusChange = (val: boolean) => {
    form.setValue('status', val ? PlayerStatus.Active : PlayerStatus.Inactive);
  };

  const handleSubmit = async () => {
    const formState = playerSchema.safeParse(form.getValues());
    if (!formState.success) {
      return Promise.reject(formState.error);
    }
    try {
      console.log(form.getValues());
      await updatePlayer({ id, player: formState.data });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    form,
    handleStatusChange,
    handleSubmit,
    isUpdating,
  };
}
