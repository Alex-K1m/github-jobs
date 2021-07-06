import { Img } from '@components/content';
import { Button } from '@components/controls';
import { shape, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ breakpoints: { smUp }, colors: c }) => ({
  wrapper: {
    display: 'grid',
    gridTemplate: '2.5rem 2.5rem auto / auto',

    [smUp]: {
      display: 'flex',
    },
  },

  logo: {
    alignItems: 'center',
    backgroundColor: ({ logoBg }) => logoBg,
    borderRadius: '1.5rem',
    display: 'flex',
    gridArea: '1 / 1 / span 2',
    justifySelf: 'center',
    overflow: 'hidden',
    padding: '0.3rem',
    width: '5rem',
    zIndex: 1,

    [smUp]: {
      borderRadius: '0.6rem 0 0 0.6rem',
      height: '14rem',
      padding: '0.8rem',
      width: '14rem',
    },
  },

  body: {
    alignItems: 'center',
    backgroundColor: c.back,
    borderRadius: '0.6rem',
    display: 'flex',
    flex: 1,
    flexFlow: 'column',
    gridArea: '2 / 1 / span 2',
    padding: '4.9rem 3.2rem 3.2rem',
    textAlign: 'center',
    wordBreak: 'break-word',

    [smUp]: {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      flexFlow: 'row',
      justifyContent: 'space-between',
      padding: '4.2rem 4rem',
      textAlign: 'left',
    },

    '& > * + *': {
      marginTop: '2.4rem',

      [smUp]: {
        marginLeft: '2rem',
        marginTop: 0,
      },
    },
  },

  heading: {
    color: c.text,
    fontSize: '2rem',
    fontWeight: 700,

    [smUp]: {
      fontSize: '2.4rem',
    },
  },

  subheading: {
    color: c.textAlt,
    marginTop: '1.3rem',
  },
}));

const JobHeading = ({ data: { company, website, logo, logoBg } }) => {
  const css = useStyles({ logoBg });

  const site = new URL(website).hostname ?? '';

  return (
    <header className={css.wrapper}>
      <div className={css.logo}>
        <Img src={logo || undefined} alt={`${company} logo`} />
      </div>
      <div className={css.body}>
        <div>
          <h2 className={css.heading}>{company}</h2>
          <p className={css.subheading}>{website}</p>
        </div>
        <Button
          as='a'
          href={site}
          target='_blank'
          rel='noreferrer'
          variant='secondary'
        >
          Company Site
        </Button>
      </div>
    </header>
  );
};

JobHeading.propTypes = {
  data: shape({
    company: string,
    website: string,
    logo: string,
    logoBg: string,
  }).isRequired,
};

export default JobHeading;
