import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {
    Box,
    CircularProgress,
    Paper,
    SxProps,
    Typography,
} from '@mui/material';
import * as React from 'react';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { RequestStatus } from '../../shared/requestStatus';
import { useMemo, useRef, useState } from 'react';
import { useLayoutEffect } from 'react';
import { FixedSizeList } from 'react-window';

const viewerStyle: SxProps = {
    p: 2,
    m: 2,
    overflowY: 'auto',
    height: 'calc(100vh - 208px)',
};
const numberGridStyle: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};
const numberRowStyle: SxProps = {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 2,
};

const numberEntryStyle: SxProps = {
    p: 2,
    textAlign: 'center',
    flex: '1 1 80px',
};
type NumberViewerProps = {
    numbers: number[];
    status: RequestStatus;
};

const mapStateToProps = ({
    numbers: { numbers, status },
}: RootState): NumberViewerProps => {
    return { numbers, status };
};

const NumberItem = ({ number }: { number: number }): JSX.Element => {
    return (
        <Paper variant="outlined" square sx={numberEntryStyle}>
            <Typography variant="body2">{number}</Typography>
        </Paper>
    );
};

export const NumberViewer = ({
    numbers,
    status,
}: NumberViewerProps): JSX.Element => {
    const paperRef = useRef<HTMLElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const updateSize = () => {
        paperRef.current && setWidth(paperRef.current.offsetWidth);
        paperRef.current && setHeight(paperRef.current.offsetHeight);
    };

    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    const listWidth = width - 32;
    const listHeight = height - 56;
    const numItemsPerRow = Math.floor(listWidth / (80 + 16));
    const numRows = Math.ceil(numbers.length / numItemsPerRow);

    const chunkedArray = useMemo(() => {
        const chunks: number[][] = [];
        for (let i = 0; i < numbers.length; i += numItemsPerRow) {
            chunks.push(numbers.slice(i, i + numItemsPerRow));
        }
        return chunks;
    }, [numItemsPerRow, numbers]);

    const viewportList = useMemo(
        () => (
            <FixedSizeList
                itemCount={numRows}
                width={listWidth}
                height={listHeight}
                itemSize={64}>
                {({ index, style }) => (
                    <Box sx={numberRowStyle} style={style}>
                        {chunkedArray[index].map((n) => (
                            <NumberItem number={n} key={n} />
                        ))}
                    </Box>
                )}
            </FixedSizeList>
        ),
        [chunkedArray, listHeight, listWidth, numRows]
    );

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Paper sx={viewerStyle} elevation={2} ref={paperRef as any}>
            <Typography variant="body1">Randomly Generated Numbers:</Typography>
            {status === 'loading' && <CircularProgress />}
            {status === 'error' && (
                <ReportProblemIcon color="error" fontSize="large" />
            )}
            {status === 'ready' &&
                numbers.length &&
                listHeight &&
                listWidth && <Box sx={numberGridStyle}>{viewportList}</Box>}
        </Paper>
    );
};

export default connect(mapStateToProps)(NumberViewer);
