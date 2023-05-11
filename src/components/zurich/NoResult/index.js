import { NoResultWrapper } from './styled';

export const NoResult = ({keyphrase}) => {
    return (
        <NoResultWrapper>
            No results found for <strong>"{keyphrase}"</strong>
        </NoResultWrapper>
    );
};

export default NoResult;