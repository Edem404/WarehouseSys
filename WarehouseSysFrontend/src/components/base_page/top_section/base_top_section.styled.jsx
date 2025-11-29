import styled from 'styled-components';

export const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    padding: 0 20px;

    background-color: #1e1e1e;
    color: white;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 2px solid #3a3a3a;
    box-sizing: border-box;
`;

export const Logo = styled.div`
    font-size: 26px;
    font-weight: 700;
    cursor: pointer;

    user-select: none;
    transition: 0.25s ease;

    &:hover {
        color: #dcdcdc;
        transform: translateY(-1px);
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const UserInfo = styled.div`
    font-size: 16px;
    margin-right: 12px;
    opacity: 0.9;
    user-select: none;
`;

export const NavButton = styled.button`
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 15px;

    background: ${(props) => {
        if (props.$isAdmin) return '#8a0000';
        if (props.$isLogout) return '#444';
        if (props.$isBack) return '#2b2b2b';
        return '#3a3a3a';
    }};

    color: white;
    border: 1px solid #5a5a5a;
    cursor: pointer;

    transition: 0.25s ease;

    &:hover {
        background: ${(props) => {
            if (props.$isAdmin) return '#a30000';
            if (props.$isLogout) return '#555';
            if (props.$isBack) return '#3a3a3a';
            return '#4a4a4a';
        }};
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;
