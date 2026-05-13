import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// 文化部展覽 API (hw#4 同款資料來源)
const API_URL =
  'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';

// DataGrid 欄位定義 — 對應 hw#4 的「名稱 / 地點 / 票價」
const columns = [
  { field: 'title', headerName: '名稱', flex: 2, minWidth: 250 },
  { field: 'location', headerName: '地點', flex: 2, minWidth: 250 },
  { field: 'price', headerName: '票價', flex: 1, minWidth: 180 },
];

function CGUDataGrid() {
  const [rows, setRows] = useState([]);         // 全部資料 (DataGrid 用)
  const [loading, setLoading] = useState(true); // 載入狀態
  const [keyword, setKeyword] = useState('');   // 搜尋字串

  // ====== 投影片 page 42 - 45 的 useEffect 寫法 ======
  // 用 useEffect 呼叫 API,並更新 datagrid 的資料
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        // 把 API 資料攤平,讓 DataGrid 直接用
        const mapped = json.map((item, index) => {
          const info =
            item.showInfo && item.showInfo.length > 0 ? item.showInfo[0] : {};
          return {
            id: item.UID || index, // DataGrid 每筆要有唯一 id
            title: item.title || '',
            location: info.location || '',
            price: info.price || '',
          };
        });
        setRows(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API 呼叫失敗:', err);
        setLoading(false);
      });
  }, []); // 空陣列 → 只在元件 mount 時跑一次

  // 依照搜尋字串過濾 (對應 hw#4 的名稱搜尋功能)
  const filteredRows = keyword
    ? rows.filter((r) =>
        r.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : rows;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4" component="h1">
          景點觀光展覽資訊
        </Typography>
        <TextField
          label="搜尋名稱"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{ width: 240 }}
        />
        {loading && <CircularProgress size={24} />}
      </Box>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#2e8b57',
              color: '#fff',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default CGUDataGrid;
