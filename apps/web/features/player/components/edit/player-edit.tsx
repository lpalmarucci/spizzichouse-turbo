'use client';

import React from 'react';
import { Detail, DetailHeader } from '@/components/detail';
import { PlayerEditForm } from './PlayerEditForm';
import { useGetPlayerById } from '../../player.hook';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

interface PlayerEditProps {
  id: string;
}

export function PlayerEdit({ id }: PlayerEditProps) {
  const { data, isLoading, error } = useGetPlayerById(id); // Gestione errori e redirect
  if (error) {
    toast.error(error.message);
    setTimeout(() => {
      redirect('/');
    }, 500);
    return;
  }
  if (!data && !isLoading) {
    toast.warning('No match found!');
    setTimeout(() => {
      redirect('/');
    }, 500);
    return;
  }
  return (
    <Detail>
      <DetailHeader
        backLocationHref={`/players/${id}`}
        headingText="Modifica giocatore"
        subHeadingText="Aggiorne le informazioni del profilo"
      />
      <PlayerEditForm id={id} player={data.player} />
    </Detail>
  );
}
