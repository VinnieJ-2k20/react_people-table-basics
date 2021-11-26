import { FC, useCallback, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { getPeople } from '../services/api';
import { PersonFull } from '../services/types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<PersonFull[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPeopleFromServer = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleInfo: PersonFull[] = await getPeople();

      setPeople(peopleInfo);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  }, []);

  useAsyncEffect(getPeopleFromServer, []);

  const shouldShowPeopleTable = !isError && !isLoading;

  return (
    <>
      <h2 className="subtitle">People page</h2>

      {isLoading && (
        <progress className="progress is-large is-info" max="100">60%</progress>
      )}

      {isError && (
        <h3 className="subtitle">Could not load People info from server</h3>
      )}

      {shouldShowPeopleTable && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
