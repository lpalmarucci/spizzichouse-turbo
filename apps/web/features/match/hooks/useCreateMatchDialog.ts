import { useForm } from 'react-hook-form';
import { zodResolver } from '@workspace/ui/zod-resolver';
import { MATCH_FORM_INITIAL_VALUES, matchSchema, type MatchSchemaType } from '@/features/match/match.schema';
import { useCreateMatch } from '../match.hook';

export function useCreateMatchDialog() {
  const form = useForm<MatchSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(matchSchema),
    defaultValues: MATCH_FORM_INITIAL_VALUES,
  });
  const { mutateAsync: createMatch, isPending: isCreatingMatch } = useCreateMatch();

  const handleSubmit = async () => {
    try {
      await createMatch(form.getValues());
      form.reset();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const resetFormFields = () => {
    form.reset(MATCH_FORM_INITIAL_VALUES);
  };

  return {
    form,
    isCreatingMatch,
    handleSubmit,
    resetFormFields,
  };
}
