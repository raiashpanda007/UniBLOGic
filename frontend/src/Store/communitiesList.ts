import { createSlice } from "@reduxjs/toolkit";

interface Community {
    name: string;
    description: string;
    communityLogo?: string;
    id: string;
}

interface CommunityListState {
    communities: Community[];
}

const intialState: CommunityListState = {
    communities: []
};

const communitiesListSlice = createSlice({
    name: "communitiesList",
    initialState: intialState,
    reducers: {
        setCommunities(state, action) {
            state.communities = action.payload;
        },
        pushCommunity(state, action) {
            state.communities.push(action.payload);
        },
        popCommunity(state, action) {
            state.communities = state.communities.filter(
                community => community && community.id !== action.payload
            );
        }
    }
});

export const { setCommunities, pushCommunity, popCommunity } = communitiesListSlice.actions;
export default communitiesListSlice.reducer;
