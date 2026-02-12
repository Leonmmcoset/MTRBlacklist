import { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  AlertTitle,
  Stack,
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { isInBlacklist } from './data/blacklist';

function App() {
  const [qqInput, setQqInput] = useState('');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!qqInput.trim()) {
      setResult(null);
      setHasSearched(false);
      return;
    }

    const found = isInBlacklist(qqInput.trim());
    setResult(found);
    setHasSearched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', py: 8 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom 
        color="primary"
        sx={{ mb: 6 }}
      >
        MTR 黑名单查询器
      </Typography>

      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
            输入 QQ 号
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="请输入 QQ 号"
              value={qqInput}
              onChange={(e) => setQqInput(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={{ minWidth: 100 }}
            >
              查询
            </Button>
          </Stack>

          {hasSearched && result && (
            <Alert severity="error" sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CancelIcon sx={{ fontSize: 32 }} />
                <Box>
                  <AlertTitle>该用户在黑名单中</AlertTitle>
                  <Typography variant="body2">QQ: {result.qq}</Typography>
                  <Typography variant="body2">原因: {result.reason}</Typography>
                  <Typography variant="body2">日期: {result.date}</Typography>
                </Box>
              </Box>
            </Alert>
          )}

          {hasSearched && !result && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon sx={{ fontSize: 32 }} />
                <Box>
                  <AlertTitle>该用户不在黑名单中</AlertTitle>
                  <Typography variant="body2">QQ: {qqInput}</Typography>
                  <Typography variant="body2">状态: 正常</Typography>
                </Box>
              </Box>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
