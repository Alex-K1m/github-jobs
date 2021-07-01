import Container from '@components/layout/Container';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchJob } from '@/store/job/job.slice';
import { selectJobById } from '@/store/jobsList/jobList.slice';
import {
  failed,
  initial,
  loading,
  succeeded,
} from '@/utils/constants/statuses';

import ScrollToTop from '../../common/ScrollToTop';
import Content from './Content';
import Cta from './Cta';
import Heading from './Heading';
import Summary from './Summary';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flex: 1,
    flexFlow: 'column',
    justifyContent: 'space-between',
  },
});

const Position = () => {
  const css = useStyles();
  const id = Number(useParams().id);
  const jobFromList = useSelector(selectJobById(id));
  const fetchedJob = useSelector((state) => state.job.job);
  const status = useSelector((state) => state.job.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jobFromList) return;

    dispatch(fetchJob(id));
  }, [dispatch, jobFromList, id]);

  const renderJob = (job) => {
    if (!job) return null;

    const {
      company,
      logo,
      website,
      postedAt,
      description,
      apply,
      location,
      position,
      contract,
    } = job;

    return (
      <>
        <ScrollToTop />
        <article className={css.wrapper}>
          <Container maxWidth='sm'>
            <Heading data={{ company, website, logo }} />
            <Content
              data={{
                position,
                postedAt,
                contract,
                location,
                website,
                description,
              }}
            />
            {apply && <Summary content={apply} />}
          </Container>
          <Cta data={{ position, company, website }} />
        </article>
      </>
    );
  };

  return {
    [initial]: () => renderJob(jobFromList),
    [loading]: () => <Container maxWidth='sm'>Loading</Container>,
    [failed]: () => <Container maxWidth='sm'>Error</Container>,
    [succeeded]: () => renderJob(fetchedJob),
  }[status]();
};

export default Position;